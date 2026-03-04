'use client';

import { useState } from 'react';
import { contactService } from '@/lib/services/contact.service';
import {
  Ship, FileText, Upload, X,
  Loader2, CheckCircle, ArrowRight, Send
} from 'lucide-react';

export default function ImportExportPage() {
  const [type, setType] = useState<'IMPORT' | 'EXPORT'>('IMPORT');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  }

  function removeFile(index: number) {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await contactService.submitImportExport({ type, description, documents: files });
      setSuccess(true);
      setDescription('');
      setFiles([]);
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  }

  const steps = [
    { num: '01', title: 'Soumission', desc: 'Remplissez le formulaire avec les détails de votre demande' },
    { num: '02', title: 'Analyse', desc: 'Notre équipe étudie votre dossier et prépare un devis' },
    { num: '03', title: 'Validation', desc: 'Vous acceptez le devis et nous lançons les démarches' },
    { num: '04', title: 'Livraison', desc: 'Votre véhicule est importé ou exporté en toute sécurité' },
  ];

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6">
            <Ship size={32} />
          </div>
          <h1 className="text-4xl font-bold mb-4">Import / Export de Véhicules</h1>
          <p className="text-gray-300 text-lg">
            Nous gérons toutes les formalités douanières et administratives pour vous
          </p>
        </div>
      </section>

      {/* Étapes du processus */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
          Comment ça marche ?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, i) => (
            <div key={step.num} className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-sm text-center h-full">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white font-bold rounded-xl mb-4 text-lg">
                  {step.num}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                  <ArrowRight size={20} className="text-blue-300" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Formulaire */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileText size={20} className="text-blue-600" />
              Soumettre une demande
            </h2>

            {/* Succès */}
            {success && (
              <div className="flex items-center gap-3 bg-green-50 text-green-700 px-4 py-4 rounded-xl mb-6 border border-green-100">
                <CheckCircle size={20} />
                <div>
                  <p className="font-semibold">Demande envoyée avec succès !</p>
                  <p className="text-sm">Notre équipe vous contactera dans les 24h.</p>
                </div>
              </div>
            )}

            {/* Erreur */}
            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-6 border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Type Import/Export */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Type de demande
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['IMPORT', 'EXPORT'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      className={`py-4 rounded-xl font-semibold border-2 transition-all ${
                        type === t
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-gray-200 text-gray-500 hover:border-gray-300'
                      }`}
                    >
                      {t === 'IMPORT' ? '🚢 Importation' : '✈️ Exportation'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description de votre demande
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Décrivez le véhicule, le pays d'origine/destination, vos besoins spécifiques..."
                  required
                  rows={5}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                />
              </div>

              {/* Upload documents */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Documents <span className="text-gray-400 font-normal">(optionnel)</span>
                </label>
                <p className="text-xs text-gray-400 mb-3">
                  Carte grise, facture, titre de propriété... (PDF, JPG, PNG)
                </p>

                {/* Zone upload */}
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                  <Upload size={24} className="text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Cliquez pour ajouter des fichiers</span>
                  <span className="text-xs text-gray-400">ou glissez-déposez ici</span>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFiles}
                    className="hidden"
                  />
                </label>

                {/* Liste des fichiers */}
                {files.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {files.map((file, i) => (
                      <div key={i} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                        <div className="flex items-center gap-3">
                          <FileText size={16} className="text-blue-500" />
                          <span className="text-sm text-gray-700 truncate max-w-xs">{file.name}</span>
                          <span className="text-xs text-gray-400">
                            ({(file.size / 1024).toFixed(0)} Ko)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(i)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading
                  ? <><Loader2 size={18} className="animate-spin" /> Envoi en cours...</>
                  : <><Send size={18} /> Soumettre la demande</>
                }
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}