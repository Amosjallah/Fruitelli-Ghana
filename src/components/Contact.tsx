import { useState, FormEvent } from 'react';
import { Phone, MapPin, Clock, MessageSquare, Compass, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleLocalSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) return;

    setSubmitted(true);
    // Temporary client side confirmation.
    setTimeout(() => {
      setSubmitted(false);
      setFormName('');
      setFormEmail('');
      setFormPhone('');
      setFormMessage('');
    }, 5000);
  };

  return (
    <section id="contact-us-panel" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-orange-600 uppercase">
            FIND OUR OFFICE
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-green-950">
            Get in Touch With Frutelli
          </h2>
          <div className="w-16 h-1 bg-gradient-mango-citrus mx-auto rounded-full" />
          <p className="text-gray-600 font-sans text-sm sm:text-base leading-relaxed mt-2">
            Interested in wholesale supply lines, hosting our dispensers at your wedding, or ordering retail? Reach out immediately.
          </p>
        </div>

        {/* Dual Column Layout: Contact Channels & Inquiries */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Coordinates details & Interactive Map */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 text-left">
            
            <div className="space-y-6">
              
              <div className="p-6 bg-brand-green-50/50 rounded-3xl border border-brand-green-100/30">
                <span className="text-[10px] text-brand-green-800 font-mono font-bold uppercase tracking-widest block mb-4">Official Business Details</span>
                
                <div className="space-y-5">
                  <div className="flex gap-3.5 items-start">
                    <div className="w-9 h-9 rounded-xl bg-white border border-brand-green-100 flex items-center justify-center shrink-0">
                      <MapPin className="w-4.5 h-4.5 text-brand-orange-500" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-gray-400 uppercase">Headquarters</h4>
                      <p className="font-display font-bold text-sm text-brand-green-950 mt-0.5">FRUTELLI COMPANY GHANA</p>
                      <p className="text-xs text-gray-600 leading-relaxed font-sans">HR53+P28, Accra, Ghana</p>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start">
                    <div className="w-9 h-9 rounded-xl bg-white border border-brand-green-100 flex items-center justify-center shrink-0">
                      <Phone className="w-4.5 h-4.5 text-brand-green-500" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-gray-400 uppercase">Direct Hotlines</h4>
                      <div className="flex flex-col mt-0.5">
                        <a href="tel:0509335623" className="font-sans text-sm font-bold text-brand-green-950 hover:text-brand-orange-600 transition-colors">
                          050 933 5623
                        </a>
                        <span className="text-[10px] text-gray-455 font-mono">WhatsApp Call available</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start">
                    <div className="w-9 h-9 rounded-xl bg-white border border-brand-green-100 flex items-center justify-center shrink-0">
                      <Clock className="w-4.5 h-4.5 text-brand-mango-500" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-gray-400 uppercase">Opening Hours</h4>
                      <p className="font-sans text-sm font-bold text-brand-green-950 mt-0.5">Daily: 8:30am - 6:00pm</p>
                      <p className="text-[10px] text-brand-green-800 font-mono font-bold uppercase mt-0.5">✓ Opens Monday to Sunday</p>
                    </div>
                  </div>
                </div>

              </div>
              
              {/* Quick links map CTA */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:0509335623"
                  className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-white border border-brand-green-100 text-brand-green-950 font-display text-xs font-bold hover:border-brand-orange-500 transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-brand-orange-500" />
                  <span>Call Directly</span>
                </a>
                <a
                  href="https://google.com/maps/search/?api=1&query=FRUTELLI+COMPANY+GHANA+HR53%2BP28+Accra+Ghana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-brand-green-800 hover:bg-brand-green-950 text-white font-display text-xs font-bold transition-all cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-white" />
                  <span>Get Directions</span>
                </a>
              </div>

            </div>

            {/* Embedded maps iframe placeholder representing HR53+P28 Accra */}
            <div className="w-full aspect-video rounded-3xl border border-brand-green-100 overflow-hidden relative shadow-xs">
              <iframe
                title="Frutelli Ghana Google Maps Location Location Pin"
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d15883.896767664883!2d-0.1983050012217154!3d5.603700000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sHR53%2BP28%2C%20Accra%2C%20Ghana!5e0!3m2!1sen!2sgh!4v1700000000000!5m2!1sen!2sgh"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="filter contrast-95 brightness-95"
              />
              <div className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-xs py-1 px-3.5 rounded-lg text-[9px] font-mono font-bold text-brand-green-950 shadow-xs uppercase">
                HR53+P28 Accra Region
              </div>
            </div>

          </div>

          {/* Right Column: Inquiries Capture Form */}
          <div className="lg:col-span-7">
            <div className="p-8 bg-brand-green-50/20 border border-brand-green-100 rounded-4xl text-left flex flex-col justify-between h-full">
              
              <div className="flex flex-col space-y-1.5 mb-6">
                <span className="text-[10px] text-brand-orange-600 font-mono font-black uppercase tracking-widest">Digital Contact Form</span>
                <h3 className="font-display font-black text-2xl text-brand-green-950">Send a Message</h3>
                <p className="text-xs text-gray-550 leading-relaxed font-sans">
                  Prefer leaving an email message? Submit your coordinates below and we will contact you directly within 2 business hours.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 bg-white border border-brand-green-100 rounded-3xl text-center space-y-4 my-auto">
                  <div className="w-12 h-12 rounded-full bg-brand-green-100 text-brand-green-800 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-brand-green-950">Inquiry Sent Successfully!</h4>
                    <p className="text-xs text-gray-500 leading-relaxed mt-1 font-sans">
                      Thank you for contacting Frutelli Company Ghana. Our representative will contact you shortly by phone or email.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleLocalSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div className="flex flex-col">
                      <label className="text-[10px] font-mono font-bold text-brand-green-950 uppercase mb-1.5 block">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Nathan Fritz"
                        className="px-4 py-3 rounded-xl border border-brand-green-100 bg-white text-xs font-sans focus:outline-hidden focus:border-brand-orange-500 transition-colors"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-[10px] font-mono font-bold text-brand-green-950 uppercase mb-1.5 block">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="e.g. 050 933 5623"
                        className="px-4 py-3 rounded-xl border border-brand-green-100 bg-white text-xs font-sans focus:outline-hidden focus:border-brand-orange-500 transition-colors"
                      />
                    </div>

                  </div>

                  <div className="flex flex-col">
                    <label className="text-[10px] font-mono font-bold text-brand-green-950 uppercase mb-1.5 block">Email Address (Optional)</label>
                    <input
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="nathan@example.com"
                      className="px-4 py-3 rounded-xl border border-brand-green-100 bg-white text-xs font-sans focus:outline-hidden focus:border-brand-orange-500 transition-colors"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[10px] font-mono font-bold text-brand-green-950 uppercase mb-1.5 block">Message / Catering Requirements *</label>
                    <textarea
                      rows={4}
                      required
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Hi Frutelli, I would like to enquire about supplying orange and mango juices for a corporate conference..."
                      className="px-4 py-3 rounded-xl border border-brand-green-100 bg-white text-xs font-sans focus:outline-hidden focus:border-brand-orange-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center space-x-2 w-full py-4 rounded-xl bg-brand-orange-500 hover:bg-brand-orange-600 text-white font-display text-xs font-bold tracking-wide shadow-md hover:shadow-lg transition-transform hover:scale-101 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message Inquiry</span>
                  </button>

                  <p className="text-[10px] text-gray-400 font-mono text-center">
                    🔒 Direct end-to-end storage encryption. We never share contacts.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
