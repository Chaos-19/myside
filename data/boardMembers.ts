import type { BoardMember } from "@/types";

/**
 * Board members data for the Myside Community Charity Organization.
 *
 * Photo paths reference files in the public/assets/Members Photo directory.
 * Note: Some filenames have specific casing or spacing that must be matched exactly.
 */
export const boardMembers: BoardMember[] = [
  {
    id: "henok-tenkir-fuji",
    name: "Henok Tenkir Fuji",
    role: "Founder/Board Chair Person",
    photo: "", // No photo file available
    degree: "BSc in Civil Engineering",
    order: 1,
  },
  {
    id: "tesfaye-hailu-tesfaye",
    name: "Tesfaye Hailu Tesfaye",
    role: "Founder/Assistant Board Chair Person",
    photo: "/assets/Members Photo/Tesfaye Hailu Tesfaye.jpg",
    degree: "BSc in Pharmacy",
    order: 2,
  },
  {
    id: "assefu-teshome-woldehawarit",
    name: "Assefu Teshome Woldehawarit",
    role: "Founder/Board Secretary",
    photo: "/assets/Members Photo/Assefu Teshome Woldehawarit.jpg",
    degree: "BSc in Business Management",
    order: 3,
  },
  {
    id: "fikrte-hailu-gwelde",
    name: "Fikrte Hailu G/Welde",
    role: "Founder/Board Member",
    photo: "/assets/Members Photo/Fikrte Hailu  GWelde.jpg", // Note: double space in filename
    degree: "Diploma in Secretarial Science",
    order: 4,
  },
  {
    id: "tigist-tilahun-tenange",
    name: "Tigist Tilahun Tenange",
    role: "Founder/Board Member",
    photo: "/assets/Members Photo/Tigist Tilahun Tenange.jpg",
    degree: "Level-IV in ICT",
    order: 5,
  },
  {
    id: "sofia-oumer-kedir",
    name: "Sofia Oumer Kedir",
    role: "Founder/Board Member",
    photo: "/assets/Members Photo/Sofia Oumer Kedir.jpg",
    degree: "BSc in Accounting and Finance",
    order: 6,
  },
  {
    id: "bezawit-tilaye-tiruneh",
    name: "Bezawit Tilaye Tiruneh",
    role: "Founder/Board Member",
    photo: "/assets/Members Photo/Bezawit Tilaye Tiruneh.jpg",
    degree: "BSc in Psychology",
    order: 7,
  },
  {
    id: "dr-robel-wasihun-gebremedhin",
    name: "Robel Wasihun Gebremedhin",
    title: "Dr.",
    role: "Volunteer Board Member",
    photo: "/assets/Members Photo/Dr Robel Wasihun Gebremedhin.jpg",
    degree: "Doctor of Medicine",
    order: 8,
  },
  {
    id: "konget-moges-ketema",
    name: "Konget Moges Ketema",
    role: "Volunteer Board Member",
    photo: "/assets/Members Photo/Konget Moges ketema.jpg", // Note: lowercase 'k' in ketema
    degree: "MSc in Special Needs",
    order: 9,
  },
  {
    id: "solomon-eshete-kassaye",
    name: "Solomon Eshete Kassaye",
    role: "Company Manager",
    photo: "/assets/Members Photo/Solomon Eshete kassaye.jpg", // Note: lowercase 'k' in kassaye
    degree: "BSc in Accounting",
    order: 10,
  },
];

export default boardMembers;
