import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [prevTimeLeft, setPrevTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      // Fecha del evento: 31 de enero de 2026, 5:30 PM (zona horaria de Lima, Perú UTC-5)
      const eventDate = new Date('2026-01-31T17:30:00-05:00');
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    // Inicializar
    const initialTime = calculateTimeLeft();
    setTimeLeft(initialTime);
    setPrevTimeLeft(initialTime);

    // Actualizar cada segundo
    const timer = setInterval(() => {
      setTimeLeft(currentTime => {
        setPrevTimeLeft(currentTime);
        return calculateTimeLeft();
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeCard = ({ value, label, prevValue }: { value: number; label: string; prevValue: number }) => {
    const hasChanged = value !== prevValue;
    
    return (
      <div className="flex flex-col items-center">
        <div className="relative">
          <div 
            className={`bg-gradient-to-br from-pink-400 to-purple-400 rounded-3xl shadow-2xl p-4 md:p-6 border-4 border-white min-w-[80px] md:min-w-[120px] transform transition-all duration-300 ${
              hasChanged ? 'scale-110' : 'scale-100'
            }`}
          >
            <div className="text-4xl md:text-6xl font-bold text-white text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {value.toString().padStart(2, '0')}
            </div>
          </div>
          {hasChanged && (
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-6 h-6 text-yellow-300 fill-yellow-300 animate-ping" />
            </div>
          )}
        </div>
        <p className="mt-3 text-sm md:text-lg text-purple-700 uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
          {label}
        </p>
      </div>
    );
  };

  return (
    <div className="text-center">
      <h2 className="text-4xl md:text-5xl text-[#bd7b6a] mb-8" style={{ fontFamily: 'Dancing Script, cursive' }}>
        Cuenta Regresiva
      </h2>
      
      {/* Mobile - Single Card */}
      <div className="md:hidden bg-gradient-to-br from-[#f5ede9] via-white to-[#fdf4ea] p-6 rounded-3xl shadow-2xl border-4 border-[#bd7b6a] mx-auto">
        <div className="flex justify-around items-center gap-2">
          <div className="text-center flex-1">
            <div className="text-3xl text-[#bd7b6a] mb-1" style={{ fontFamily: 'Dancing Script, cursive' }}>
              {timeLeft.days}
            </div>
            <div className="text-xs text-[#99926b]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Días
            </div>
          </div>
          
          <div className="text-2xl text-[#bd7b6a]">:</div>
          
          <div className="text-center flex-1">
            <div className="text-3xl text-[#99926b] mb-1" style={{ fontFamily: 'Dancing Script, cursive' }}>
              {timeLeft.hours}
            </div>
            <div className="text-xs text-[#af732f]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Horas
            </div>
          </div>
          
          <div className="text-2xl text-[#99926b]">:</div>
          
          <div className="text-center flex-1">
            <div className="text-3xl text-[#af732f] mb-1" style={{ fontFamily: 'Dancing Script, cursive' }}>
              {timeLeft.minutes}
            </div>
            <div className="text-xs text-[#bd7b6a]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Min
            </div>
          </div>
          
          <div className="text-2xl text-[#af732f]">:</div>
          
          <div className="text-center flex-1">
            <div className="text-3xl text-[#bd7b6a] mb-1" style={{ fontFamily: 'Dancing Script, cursive' }}>
              {timeLeft.seconds}
            </div>
            <div className="text-xs text-[#99926b]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Seg
            </div>
          </div>
        </div>
      </div>

      {/* Desktop - 4 Separate Cards */}
      <div className="hidden md:grid md:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-gradient-to-br from-[#f5ede9] to-white p-6 rounded-2xl shadow-lg border-2 border-[#bd7b6a] transform hover:scale-105 transition-transform">
          <div className="text-4xl md:text-5xl text-[#bd7b6a] mb-2" style={{ fontFamily: 'Dancing Script, cursive' }}>
            {timeLeft.days}
          </div>
          <div className="text-sm md:text-base text-[#99926b]" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Días
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-[#f1f0e8] to-white p-6 rounded-2xl shadow-lg border-2 border-[#99926b] transform hover:scale-105 transition-transform">
          <div className="text-4xl md:text-5xl text-[#99926b] mb-2" style={{ fontFamily: 'Dancing Script, cursive' }}>
            {timeLeft.hours}
          </div>
          <div className="text-sm md:text-base text-[#af732f]" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Horas
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-[#fdf4ea] to-white p-6 rounded-2xl shadow-lg border-2 border-[#af732f] transform hover:scale-105 transition-transform">
          <div className="text-4xl md:text-5xl text-[#af732f] mb-2" style={{ fontFamily: 'Dancing Script, cursive' }}>
            {timeLeft.minutes}
          </div>
          <div className="text-sm md:text-base text-[#bd7b6a]" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Minutos
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-[#f5ede9] to-white p-6 rounded-2xl shadow-lg border-2 border-[#bd7b6a] transform hover:scale-105 transition-transform">
          <div className="text-4xl md:text-5xl text-[#bd7b6a] mb-2" style={{ fontFamily: 'Dancing Script, cursive' }}>
            {timeLeft.seconds}
          </div>
          <div className="text-sm md:text-base text-[#99926b]" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Segundos
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-lg text-[#af732f] italic" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300 }}>
        ¡No te lo pierdas!
      </p>
    </div>
  );
}