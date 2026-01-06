import { useState, useEffect } from 'react';
import { Gift, Check, Lock } from 'lucide-react';

interface GiftItem {
  id: number;
  name: string;
  reserved: boolean;
  reservedBy: string;
}

const initialGifts: GiftItem[] = [
  { id: 1, name: 'Cuna', reserved: false, reservedBy: '' },
  { id: 2, name: 'Carriola', reserved: false, reservedBy: '' },
  { id: 3, name: 'Pañalera', reserved: false, reservedBy: '' },
  { id: 4, name: 'Set de ropa', reserved: false, reservedBy: '' },
  { id: 5, name: 'Biberones', reserved: false, reservedBy: '' },
  { id: 6, name: 'Monitor', reserved: false, reservedBy: '' },
  { id: 7, name: 'Juguetes', reserved: false, reservedBy: '' },
  { id: 8, name: 'Cobijas', reserved: false, reservedBy: '' },
  { id: 9, name: 'Bañera', reserved: false, reservedBy: '' },
  { id: 10, name: 'Esterilizador', reserved: false, reservedBy: '' },
];

export function GiftRegistry() {
  const [gifts, setGifts] = useState<GiftItem[]>(initialGifts);
  const [showModal, setShowModal] = useState(false);
  const [selectedGiftId, setSelectedGiftId] = useState<number | null>(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Cargar regalos guardados
    const saved = localStorage.getItem('babyShowerGifts');
    if (saved) {
      setGifts(JSON.parse(saved));
    }
  }, []);

  const handleGiftClick = (gift: GiftItem) => {
    if (!gift.reserved) {
      setSelectedGiftId(gift.id);
      setShowModal(true);
      setUserName('');
    }
  };

  const handleReserve = (id: number) => {
    if (userName.trim()) {
      const updatedGifts = gifts.map(g => 
        g.id === id 
          ? { ...g, reserved: true, reservedBy: userName.trim() }
          : g
      );
      
      setGifts(updatedGifts);
      localStorage.setItem('babyShowerGifts', JSON.stringify(updatedGifts));
      setShowModal(false);
      setSelectedGiftId(null);
      setUserName('');
    }
  };

  const handleRelease = (id: number) => {
    const updatedGifts = gifts.map(g => 
      g.id === id 
        ? { ...g, reserved: false, reservedBy: '' }
        : g
    );
    
    setGifts(updatedGifts);
    localStorage.setItem('babyShowerGifts', JSON.stringify(updatedGifts));
  };

  const availableCount = gifts.filter(g => !g.reserved).length;
  const reservedCount = gifts.filter(g => g.reserved).length;

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <Gift className="w-12 h-12 text-[#bd7b6a] mx-auto mb-3" />
        <h2 className="text-4xl md:text-5xl text-[#bd7b6a] mb-4" style={{ fontFamily: 'Dancing Script, cursive' }}>
          Mesa de Regalos
        </h2>
        <p className="text-lg text-[#99926b]" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Si deseas obsequiarle algo a Miranda, aquí algunas ideas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gifts.map(gift => (
          <div 
            key={gift.id} 
            className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all transform hover:scale-105 ${
              gift.reserved ? 'border-[#99926b] bg-[#f1f0e8]' : 'border-[#bd7b6a] hover:border-[#af732f]'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-full ${gift.reserved ? 'bg-[#f1f0e8]' : 'bg-[#f5ede9]'}`}>
                  <Gift className={`w-6 h-6 ${gift.reserved ? 'text-[#99926b]' : 'text-[#bd7b6a]'}`} />
                </div>
                <h3 className="text-xl text-gray-800" style={{ fontFamily: 'Dancing Script, cursive' }}>
                  {gift.name}
                </h3>
              </div>
              {gift.reserved && (
                <Check className="w-6 h-6 text-[#99926b]" />
              )}
            </div>

            {gift.reserved ? (
              <div className="text-center py-3">
                <p className="text-[#99926b] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Reservado por <strong>{gift.reservedBy}</strong>
                </p>
                <button
                  onClick={() => handleRelease(gift.id)}
                  className="w-full bg-gradient-to-r from-[#99926b] to-[#af732f] text-white py-2 px-4 rounded-lg hover:from-[#87825c] hover:to-[#9a6229] transition-all flex items-center justify-center gap-2"
                >
                  Liberar
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleReserve(gift.id)}
                className="w-full bg-gradient-to-r from-[#bd7b6a] to-[#af732f] text-white py-3 px-4 rounded-lg hover:from-[#a66959] hover:to-[#9a6229] transition-all transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
              >
                Reservar
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full border-4 border-[#bd7b6a]">
            <h3 className="text-2xl text-[#bd7b6a] mb-4 text-center" style={{ fontFamily: 'Dancing Script, cursive' }}>
              Reservar Regalo
            </h3>
            <p className="text-[#99926b] mb-6 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Ingresa tu nombre para reservar este regalo
            </p>
            
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Tu nombre"
              className="w-full px-4 py-3 rounded-xl border-2 border-[#bd7b6a] focus:outline-none focus:ring-2 focus:ring-[#af732f] focus:border-transparent mb-6"
              style={{ fontFamily: 'Poppins, sans-serif' }}
              autoFocus
            />

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setUserName('');
                  setSelectedGiftId(null);
                }}
                className="border-2 border-[#99926b] text-[#99926b] px-6 py-3 rounded-xl hover:bg-[#f1f0e8] transition-all"
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
              >
                Cancelar
              </button>
              <button
                onClick={() => handleReserve(selectedGiftId!)}
                disabled={!userName.trim()}
                className="bg-gradient-to-r from-[#bd7b6a] to-[#af732f] text-white px-6 py-3 rounded-xl hover:from-[#a66959] hover:to-[#9a6229] disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}