export interface Testimonial {
  id: string;
  name: string;
  source: string;
  comment: string;
  rating: number;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Raphaël Kamga",
    source: "Google Reviews",
    comment: "Service excellent ! J'ai loué une voiture pour mon voyage d'affaires et tout s'est déroulé sans problème. L'équipe est très professionnelle et courtoise.",
    rating: 5,
  },
  {
    id: "2",
    name: "Amandine Nkomo",
    source: "Facebook",
    comment: "J'ai acheté un véhicule chez Stilles Auto et je suis très satisfaite. Le prix était juste et les conditions de vente très claires. Merci !",
    rating: 5,
  },
  {
    id: "3",
    name: "Jean-Paul Talla",
    source: "Google Reviews",
    comment: "Excellente expérience de location. Le véhicule était en parfait état et le service client vraiment au top. Je recommande vivement !",
    rating: 5,
  },
  {
    id: "4",
    name: "Marie Fotso",
    source: "Facebook",
    comment: "Les accessoires que j'ai achetés sont de très bonne qualité. Livraison rapide et bien emballée. Très content de mon achat.",
    rating: 4.5,
  },
  {
    id: "5",
    name: "Pierre Nkufo",
    source: "Google Reviews",
    comment: "Service de location fiable et transparent. Les tarifs sont compétitifs et l'équipe est très accueillante. À recommander !",
    rating: 5,
  },
  {
    id: "6",
    name: "Sophie Mbarga",
    source: "Facebook",
    comment: "Très satisfaite de mon expérience chez Stilles Auto. Personnel courtois, véhicules bien entretenus. Je vais revenir !",
    rating: 5,
  },
];
