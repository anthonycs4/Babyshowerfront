import { useEffect, useMemo, useState } from 'react';
import { Gift as GiftIcon, Check, ExternalLink, Loader2 } from 'lucide-react';

type GiftStatus = 'AVAILABLE' | 'RESERVED';

interface GiftApiItem {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  buyUrl: string | null;
  imagePath: string | null;
  imagePublicUrl: string | null;
  status: GiftStatus;
  reservedByName: string | null;
  reservedAt: string | null;
  sortOrder: number;
}

const API_BASE = 'https://baby-shower-back-production.up.railway.app';

// ✅ tu proyecto + bucket público (según tu ejemplo)
const SUPABASE_URL = 'https://qprwptddaycddpbaufwf.supabase.co';
const SUPABASE_BUCKET = 'gifts';
const SUPABASE_PUBLIC_BUCKET_URL = `${SUPABASE_URL}/storage/v1/object/public/${SUPABASE_BUCKET}`;

export function GiftRegistry() {
  const [gifts, setGifts] = useState<GiftApiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedGiftId, setSelectedGiftId] = useState<string | null>(null);
  const [selectedGiftTitle, setSelectedGiftTitle] = useState<string>('');
  const [userName, setUserName] = useState('');
  const [reserving, setReserving] = useState(false);

  const availableCount = useMemo(
    () => gifts.filter((g) => g.status === 'AVAILABLE').length,
    [gifts],
  );

  const reservedCount = useMemo(
    () => gifts.filter((g) => g.status === 'RESERVED').length,
    [gifts],
  );

  async function fetchGifts() {
    try {
      setErrorMsg(null);
      setLoading(true);

      const res = await fetch(`${API_BASE}/gifts`);
      if (!res.ok) throw new Error(`Error ${res.status} al cargar regalos`);
      const data = (await res.json()) as GiftApiItem[];

      data.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      setGifts(data);
    } catch (e: any) {
      setErrorMsg(e?.message || 'No se pudo cargar la lista de regalos.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGifts();
  }, []);

  const openReserveModal = (gift: GiftApiItem) => {
    if (gift.status !== 'AVAILABLE') return;
    setSelectedGiftId(gift.id);
    setSelectedGiftTitle(gift.title);
    setUserName('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedGiftId(null);
    setSelectedGiftTitle('');
    setUserName('');
  };

  const handleReserve = async () => {
    const giftId = selectedGiftId;
    const reservedByName = userName.trim();
    if (!giftId || !reservedByName) return;

    try {
      setReserving(true);
      setErrorMsg(null);

      const res = await fetch(`${API_BASE}/gifts/${giftId}/reserve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reservedByName }),
      });

      if (!res.ok) {
        let detail = '';
        try {
          const errJson = await res.json();
          detail = errJson?.message ? `: ${errJson.message}` : '';
        } catch {}
        throw new Error(`No se pudo reservar (HTTP ${res.status})${detail}`);
      }

      closeModal();
      await fetchGifts();
    } catch (e: any) {
      setErrorMsg(e?.message || 'No se pudo reservar el regalo.');
    } finally {
      setReserving(false);
    }
  };

  // ✅ ahora sí devuelve URL usable
  const getImageSrc = (gift: GiftApiItem) => {
    // 1) si backend ya lo manda, úsalo
    if (gift.imagePublicUrl) return gift.imagePublicUrl;

    // 2) si solo hay imagePath, construye URL pública del bucket
    if (gift.imagePath) {
      // encodeURIComponent para espacios, tildes, paréntesis, etc.
      return `${SUPABASE_PUBLIC_BUCKET_URL}/${encodeURIComponent(gift.imagePath)}`;
    }

    return null;
  };

  if (loading) {
    return (
      <div className="w-full text-center py-12">
        <Loader2 className="w-10 h-10 mx-auto animate-spin text-[#bd7b6a]" />
        <p className="mt-4 text-[#99926b]" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Cargando regalos...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <GiftIcon className="w-12 h-12 text-[#bd7b6a] mx-auto mb-3" />
        <h2 className="text-4xl md:text-5xl text-[#bd7b6a] mb-4" style={{ fontFamily: 'Dancing Script, cursive' }}>
          Mesa de Regalos
        </h2>
        <p className="text-lg text-[#99926b]" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Si deseas obsequiarle algo a Miranda, aquí algunas ideas
        </p>

        <p className="mt-3 text-sm text-[#99926b]" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Disponibles: <strong>{availableCount}</strong> · Reservados: <strong>{reservedCount}</strong>
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl border-2 border-red-300 bg-red-50 text-red-700">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gifts.map((gift) => {
          const img = getImageSrc(gift);

          return (
            <div
              key={gift.id}
              className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all transform hover:scale-105 ${
                gift.status === 'RESERVED'
                  ? 'border-[#99926b] bg-[#f1f0e8]'
                  : 'border-[#bd7b6a] hover:border-[#af732f]'
              }`}
            >
              {/* Imagen */}
              <div className="w-full h-44 rounded-xl overflow-hidden mb-4 border border-black/5 bg-white">
                {img ? (
                  <img
                    src={img}
                    alt={gift.title}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    onError={(e) => {
                      // si el archivo no existe con ese nombre exacto
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#99926b]">
                    <span style={{ fontFamily: 'Poppins, sans-serif' }}>Sin imagen</span>
                  </div>
                )}
              </div>

              {/* Título + estado */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl text-gray-800" style={{ fontFamily: 'Dancing Script, cursive' }}>
                  {gift.title}
                </h3>
                {gift.status === 'RESERVED' && <Check className="w-6 h-6 text-[#99926b]" />}
              </div>

              {/* Link */}
              {gift.buyUrl && (
                <a
                  href={gift.buyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#af732f] hover:underline mb-4"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Ver enlace <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {/* Reserva */}
              {gift.status === 'RESERVED' ? (
                <div className="text-center py-3">
                  <p className="text-[#99926b]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Reservado 
                  </p>
                </div>
              ) : (
                <button
                  onClick={() => openReserveModal(gift)}
                  className="w-full bg-gradient-to-r from-[#bd7b6a] to-[#af732f] text-white py-3 px-4 rounded-lg hover:from-[#a66959] hover:to-[#9a6229] transition-all transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
                >
                  Reservar
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal Reserva */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full border-4 border-[#bd7b6a]">
            <h3 className="text-2xl text-[#bd7b6a] mb-2 text-center" style={{ fontFamily: 'Dancing Script, cursive' }}>
              Reservar Regalo
            </h3>
            <p className="text-[#99926b] mb-6 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Ingresa tu nombre para reservar: <strong>{selectedGiftTitle}</strong>
            </p>

            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Tu nombre"
              className="w-full px-4 py-3 rounded-xl border-2 border-[#bd7b6a] focus:outline-none focus:ring-2 focus:ring-[#af732f] focus:border-transparent mb-6"
              style={{ fontFamily: 'Poppins, sans-serif' }}
              autoFocus
              disabled={reserving}
            />

            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 border-2 border-[#99926b] text-[#99926b] px-6 py-3 rounded-xl hover:bg-[#f1f0e8] transition-all"
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                disabled={reserving}
              >
                Cancelar
              </button>

              <button
                onClick={handleReserve}
                disabled={!userName.trim() || reserving}
                className="flex-1 bg-gradient-to-r from-[#bd7b6a] to-[#af732f] text-white px-6 py-3 rounded-xl hover:from-[#a66959] hover:to-[#9a6229] disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
              >
                {reserving ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                {reserving ? 'Reservando...' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
