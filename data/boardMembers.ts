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
    photo: "/assets/Members Photo/Henok Tenkir Fuji.jpg", // No photo file available
    degree: "BSc in Civil Engineering",
    email: "henok.fuji@mysidespnesc.et",
    order: 3,
  },
  {
    id: "tesfaye-hailu-tesfaye",
    name: "Tesfaye Hailu Tesfaye",
    role: "Founder/Assistant Board Chair Person",
    photo: "/assets/Members Photo/Tesfaye Hailu Tesfaye.jpg",
    degree: "BSc in Pharmacy",
    email: "tesfaye.hailu@mysidespnesc.et",
    order: 4,
  },
  {
    id: "assefu-teshome-woldehawarit",
    name: "Assefu Teshome Woldehawarit",
    role: "Founder/Board Secretary",
    photo: "/assets/Members Photo/Assefu Teshome Woldehawarit.jpg",
    degree: "BSc in Business Management",
    email: "assefu.woldehawarit@mysidespnesc.et",
    order: 5,
  },
  {
    id: "fikrte-hailu-gwelde",
    name: "Fikrte Hailu G/Welde",
    role: "Founder/Board Member",
    photo: "/assets/Members Photo/Fikrte Hailu  GWelde.jpg", // Note: double space in filename
    degree: "Diploma in Secretarial Science",
    email: "fikrte.gwelde@mysidespnesc.et",
    order: 6,
  },
  {
    id: "tigist-tilahun-tenange",
    name: "Tigist Tilahun Tenange",
    role: "Founder/Board Member",
    photo: "/assets/Members Photo/Tigist Tilahun Tenange.jpg",
    degree: "Level-IV in ICT",
    email: "tigist.tenange@mysidespnesc.et",
    order: 7,
  },
  {
    id: "sofia-oumer-kedir",
    name: "Sofia Oumer Kedir",
    role: "Founder/Board Member",
    photo: "/assets/Members Photo/Sofia Oumer Kedir.jpg",
    degree: "BSc in Accounting and Finance",
    email: "sofia.kedir@mysidespnesc.et",
    order: 9,
  },
  {
    id: "bezawit-tilaye-tiruneh",
    name: "Bezawit Tilaye Tiruneh",
    role: "Founder/Board Member",
    photo: "/assets/Members Photo/Bezawit Tilaye Tiruneh.jpg",
    degree: "BSc in Psychology",
    email: "bezawit.tiruneh@mysidespnesc.et",
    order: 8,
  },
  {
    id: "dr-robel-wasihun-gebremedhin",
    name: "Robel Wasihun Gebremedhin",
    title: "Dr.",
    role: "Volunteer Board Member",
    photo: "/assets/Members Photo/Dr Robel Wasihun Gebremedhin.jpg",
    degree: "Doctor of Medicine",
    email: "robel.gebremedhin@mysidespnesc.et",
    order: 1,
  },
  {
    id: "konget-moges-ketema",
    name: "Konget Moges Ketema",
    role: "Volunteer Board Member",
    photo: "/assets/Members Photo/Konget Moges ketema.jpg", // Note: lowercase 'k' in ketema
    degree: "MSc in Special Needs",
    email: "konget.ketema@mysidespnesc.et",
    order: 2,
  },
  {
    id: "solomon-eshete-kassaye",
    name: "Solomon Eshete Kassaye",
    role: "Company Manager",
    photo: "/assets/Members Photo/Solomon Eshete kassaye.jpg", // Note: lowercase 'k' in kassaye
    degree: "BSc in Accounting",
    email: "solomon.kassaye@mysidespnesc.et",
    order: 10,
  },
  {
    id: "mart-deneke-birre",
    name: "Marta Deneke Birre",
    role: "Casher",
    photo: "/assets/Members Photo/Marta Deneke Birre.jpg", // Note: lowercase 'k' in kassaye
    degree: "BSC in Pharmacy",
    email: "marta.birre@mysidespnesc.et",
    order: 10,
  },
];

export default boardMembers;
