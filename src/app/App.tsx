import { Heart, Baby, Calendar, MapPin } from 'lucide-react';
import { Countdown } from './components/Countdown';
import { RSVPForm } from './components/RSVPForm';
import { GiftRegistry } from './components/GiftRegistry';
import { Gallery } from './components/Gallery';
import backgroundImage from "../assets/bg.png";

export default function App() {
  return (
    <div className="min-h-screen relative">
      {/* Fixed Background */}
      <div
        className="
          fixed inset-0 -z-10
          bg-no-repeat
          bg-cover
          bg-[position:50%_20%]
          md:bg-center
          md:bg-fixed
        "
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/60" />
      </div>

      {/* Scrollable Content */}
      <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          {/* Decorative Hearts */}
          <div className="flex justify-center gap-4 mb-8">
            <Heart className="w-8 h-8 text-[#bd7b6a] fill-[#bd7b6a] float-animation" />
            <Baby className="w-10 h-10 text-[#99926b] fill-[#99926b] float-animation" style={{ animationDelay: '0.3s' }} />
            <Heart className="w-8 h-8 text-[#af732f] fill-[#af732f] float-animation" style={{ animationDelay: '0.6s' }} />
          </div>

          <h1 className="text-6xl md:text-8xl text-[#bd7b6a] mb-6 fade-in" style={{ fontFamily: 'Dancing Script, cursive' }}>
            Baby Shower de Miranda
          </h1>
          
          <p className="text-xl md:text-2xl text-[#99926b] mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
Nuestra hadita está en camino, 
te invitamos a celebrar su llegada con amor y alegría          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 my-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#bd7b6a]"></div>
            <div className="w-3 h-3 rounded-full bg-[#af732f]"></div>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#99926b]"></div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-[#bd7b6a]">
            <Countdown />
          </div>
        </div>
      </section>

      {/* Event Information Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-[#99926b]">
            
            {/* Parents Info */}
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl text-[#99926b] mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300 }}>
                Futuros Papás
              </h2>
              <p className="text-3xl md:text-4xl text-[#af732f]" style={{ fontFamily: 'Dancing Script, cursive' }}>
                Israel & Josly
              </p>
            </div>

            {/* Event Details Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              
              {/* Date & Time */}
              <div className="bg-gradient-to-br from-[#f5ede9] to-[#fdf4ea] rounded-2xl p-6 border-2 border-[#bd7b6a]">
                <div className="flex items-start gap-4">
                  <div className="bg-white rounded-full p-3 shadow-md">
                    <Calendar className="w-8 h-8 text-[#bd7b6a]" />
                  </div>
                  <div>
                    <h3 className="text-xl text-[#af732f] mb-2" style={{ fontFamily: 'Dancing Script, cursive' }}>
                      Fecha y Hora
                    </h3>
                    <p className="text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      31 de enero de 2026
                    </p>
                    <p className="text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      4:00 PM
                    </p>
                  </div>
                </div>
                <a
                      href="https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20260131T210000Z%2F20260201T033000Z&details=&location=Calle%20Dr.%20Cayetano%20Valmore%20Roncalla%20225%20%20San%20Isidro&text=Baby%20Shower%20Miranda"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-[#99926b] hover:bg-[#af732f] text-white px-4 py-2 rounded-lg transition-colors shadow-md"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      
                      Agendar
                    </a>
              </div>

              {/* Location */}
              <div className="bg-gradient-to-br from-[#f1f0e8] to-[#f5ede9] rounded-2xl p-6 border-2 border-[#99926b]">
                <div className="flex items-start gap-4">
                  <div className="bg-white rounded-full p-3 shadow-md">
                    <MapPin className="w-8 h-8 text-[#99926b]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl text-[#af732f] mb-2" style={{ fontFamily: 'Dancing Script, cursive' }}>
                      Lugar
                    </h3>
                    <p className="text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Calle Dr. Cayetano Valmore Roncalla 225
                    </p>
                    <p className="text-gray-700 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      San Isidro
                    </p>
                   
                  </div>
                </div>
                 <a
                      href="https://maps.app.goo.gl/1Ty3R3StsPvpvkxt8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-[#99926b] hover:bg-[#af732f] text-white px-4 py-2 rounded-lg transition-colors shadow-md"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <MapPin className="w-4 h-4" />
                      Ver en Maps
                    </a>
              </div>
            </div>

            {/* Baby Name Highlight */}
            <div className="text-center p-8">
              <p className="text-2xl text-[#99926b] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
  Esperamos con amor a
</p>

<h3 className="text-7xl md:text-8xl text-[#bd7b6a] mb-3" style={{ fontFamily: 'Dancing Script, cursive' }}>
  Miranda
</h3>

              <div className="flex justify-center gap-2 mt-4">
                <Heart className="w-5 h-5 text-[#bd7b6a] fill-[#bd7b6a]" />
                <Heart className="w-5 h-5 text-[#af732f] fill-[#af732f]" />
                <Heart className="w-5 h-5 text-[#99926b] fill-[#99926b]" />
              </div>
            </div>

            {/* Footer Message */}
            <div className="text-center mt-12">
              <p className="text-lg text-gray-600 italic" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 300 }}>
                ¡Tu presencia hará este momento aún más especial!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <RSVPForm />
        </div>
      </section>

      {/* Gift Registry Section */}
      <section className="py-16 px-4 bg-white/30">
        <div className="max-w-6xl mx-auto">
          <GiftRegistry />
        </div>
      </section>

      {/* Gallery Section */}
      {/* <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Gallery />
        </div>
      </section> */}
      </div>
    </div>
  );
}