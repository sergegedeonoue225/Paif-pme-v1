import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [notification, setNotification] = useState<string | null>(null);

  // Effet pour faire disparaître la notification après 3 secondes
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/messages.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          nom_complet: formData.name,
          sujet: formData.subject,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setNotification('Votre message a été envoyé avec succès!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(
          result.message || "Une erreur est survenue lors de l'envoi."
        );
      }
    } catch (error) {
      setNotification(`Erreur: ${error.message}`);
    }
  };

  return (
    <div className="bg-white">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 max-w-sm">
          <div className="p-4 text-white bg-green-600 rounded-md shadow-lg">
            {notification}
          </div>
        </div>
      )}

      {/* Contact Header */}
      <div className="relative bg-green-700 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Contactez-nous
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-200">
              Nous sommes là pour vous aider et répondre à vos questions
            </p>
          </div>
        </div>
      </div>

      {/* Contact Content */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="grid grid-cols-1 gap-x-20 gap-y-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Nos Coordonnées
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              N'hésitez pas à nous contacter pour toute question ou suggestion.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-center gap-x-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <MapPin className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Adresse
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Ouagadougou, Burkina Faso
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-x-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <Phone className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Téléphone
                  </h3>
                  <p className="mt-2 text-gray-600">+226 XX XX XX XX</p>
                </div>
              </div>

              <div className="flex items-center gap-x-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <Mail className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                  <p className="mt-2 text-gray-600">contact@paif-pme.bf</p>
                </div>
              </div>
              <div className="flex items-center gap-x-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <Mail className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                  <p className="mt-2 text-gray-600">infos@paif-pme.bf</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Nous contacter par formulaire
            </h2>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nom complet
              </label>
              <input
                type="text"
                id="name"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Objet
              </label>
              <input
                type="text"
                id="subject"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-green-700 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-green-800"
            >
              <Send className="mr-2 h-5 w-5" />
              Envoyer le message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
