import { useState, useEffect } from 'react';
import { Heart, Send } from 'lucide-react';

interface RSVPData {
  name: string;
  guests: number;
  confirmed: boolean;
  createdAt?: string; // opcional si tu API lo devuelve
}

const API_BASE = 'https://baby-shower-back-production.up.railway.app';

export function RSVPForm() {
  const [name, setName] = useState('');
  const [guests, setGuests] = useState<number>(0);
  const [submitted, setSubmitted] = useState(false);
  const [savedRSVP, setSavedRSVP] = useState<RSVPData | null>(null);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('babyShowerRSVP');
    if (saved) {
      const rsvpData = JSON.parse(saved) as RSVPData;
      setSavedRSVP(rsvpData);
      setName(rsvpData.name);
      setGuests(rsvpData.guests);
      setSubmitted(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const fullName = name.trim();
    if (!fullName) return;

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // tu API espera fullName y companionsCount
        body: JSON.stringify({
          fullName,
          companionsCount: Number(guests) || 0,
        }),
      });

      // Si tu backend devuelve errores con JSON
      if (!res.ok) {
        let detail = '';
        try {
          const errJson = await res.json();
          detail = errJson?.message ? `: ${errJson.message}` : '';
        } catch {}
        throw new Error(`Error ${res.status}${detail}`);
      }

      // Si tu API retorna algo, lo puedes leer:
      // const data = await res.json();
      // pero si no retorna nada, no pasa nada.

      const rsvpData: RSVPData = {
        name: fullName,
        guests: Number(guests) || 0,
        confirmed: true,
      };

      localStorage.setItem('babyShowerRSVP', JSON.stringify(rsvpData));
      setSavedRSVP(rsvpData);
      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err?.message || 'No se pudo confirmar. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setGuests(0);
    setSavedRSVP(null);
    setErrorMsg(null);
    localStorage.removeItem('babyShowerRSVP');
  };

  if (submitted && savedRSVP) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl p-8 border-4 border-green-300 text-center">
        <Heart className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-3xl text-green-700 mb-3" style={{ fontFamily: 'Dancing Script, cursive' }}>
          ¡Confirmación Recibida!
        </h3>
        <p className="text-lg text-gray-700 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <strong>{savedRSVP.name}</strong>
        </p>
        <p className="text-gray-600 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {savedRSVP.guests === 0
            ? 'Asistirás solo/a'
            : `Asistirás con ${savedRSVP.guests} acompañante${savedRSVP.guests > 1 ? 's' : ''}`}
        </p>
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Editar confirmación
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-[#af732f]">
      <div className="text-center mb-8">
        <Heart className="w-12 h-12 text-[#bd7b6a] fill-[#bd7b6a] mx-auto mb-3" />
        <h2 className="text-4xl md:text-5xl text-[#bd7b6a] mb-4" style={{ fontFamily: 'Dancing Script, cursive' }}>
          Confirma tu Asistencia
        </h2>
        <p className="text-lg text-[#99926b]" style={{ fontFamily: 'Poppins, sans-serif' }}>
          ¡Nos encantaría contar con tu presencia!
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl border-2 border-red-300 bg-red-50 text-red-700">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[#99926b] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Tu nombre
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-[#bd7b6a] focus:outline-none focus:ring-2 focus:ring-[#af732f] focus:border-transparent transition-all"
            placeholder="Nombre completo"
            style={{ fontFamily: 'Poppins, sans-serif' }}
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-[#99926b] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Número de acompañantes
          </label>
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            min={0}
            max={10}
            className="w-full px-4 py-3 rounded-xl border-2 border-[#99926b] focus:outline-none focus:ring-2 focus:ring-[#af732f] focus:border-transparent transition-all"
            style={{ fontFamily: 'Poppins, sans-serif' }}
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#bd7b6a] via-[#af732f] to-[#99926b] text-white py-4 rounded-xl hover:from-[#a66959] hover:via-[#9a6229] hover:to-[#87825c] transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:hover:scale-100"
          style={{ fontFamily: 'Poppins, sans-serif' }}
          disabled={loading}
        >
          <Send className="w-5 h-5" />
          {loading ? 'Confirmando...' : 'Confirmar Asistencia'}
        </button>
      </form>
    </div>
  );
}
