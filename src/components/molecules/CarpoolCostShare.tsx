import { useState } from "react";
import Button from "../atoms/Button";

export default function CarpoolCostShare() {
  // This is a pitch for an additional feature. // With this feature, users can share the cost by selecting and carpooling with others who are on the same route.
  const baseCost = 30;

  const avatars = [
    "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortFlat&hairColor=BrownDark&clotheType=ShirtScoopNeck&mouthType=Smile",
    "https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&hairColor=Blonde&clotheType=BlazerShirt&skinColor=DarkBrown",
    "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairDreads02&hairColor=Black&facialHairType=BeardMedium&clotheType=GraphicShirt",
    "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairFrizzle&hairColor=Auburn&clotheType=Hoodie&skinColor=Black",
  ];

  const [selected, setSelected] = useState<number[]>([]);

  const toggleAvatar = (index: number) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const selectedCount = selected.length;

  // Split cost among the user + selected people
  const peopleForSplit = selectedCount + 1;
  const sharedCost = (baseCost / peopleForSplit).toFixed(2);

  return (
    <div className="w-full max-w-xl mx-auto mt-12 mb-20 text-center">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2 justify-center">
        MyWheels
        <span className="px-3 py-1 bg-green-100 border text-green-700 text-xs font-semibold rounded-full">
          Carpool
        </span>
      </h3>

      <p className="text-gray-600 text-sm mb-6">
        We hebben 4 reizigers gevonden die dezelfde kant op gaan als jij. Wil je
        de kosten delen door samen te carpoolen?
      </p>

      <div className="flex -space-x-3 justify-center items-center mx-auto mb-10">
        {avatars.map((src, index) => {
          const active = selected.includes(index);

          return (
            <button
              key={index}
              onClick={() => toggleAvatar(index)}
              className={`
                w-12 h-12 rounded-full border shadow-sm overflow-hidden bg-gray-100 flex items-center justify-center transition
                ${
                  active
                    ? "border-3 border-green-300 scale-110"
                    : "border-white opacity-80 hover:opacity-100"
                }
              `}
            >
              <img src={src} className="w-full h-full object-cover" />
            </button>
          );
        })}
      </div>

      <span className="text-sm py-5 block">
        Selecteer met wie je wilt reizen
      </span>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 max-w-md mx-auto">
        <h5 className="text-lg font-semibold text-gray-800 mb-3">
          Deel de kosten van de rit
        </h5>

        <p className="text-gray-600 text-sm mb-5">
          Geselecteerde personen: <strong>{selectedCount}</strong> + 1 (jij)
        </p>

        <div className="p-5 bg-white rounded-xl border border-gray-200 text-center">
          <div className="text-green-600 font-bold text-3xl">
            &euro; {sharedCost}
          </div>
          <div className="text-xs text-gray-500 mt-1">Kosten per persoon</div>
        </div>

        <div className="flex justify-center">
          <Button label="Bekijk kosten voor jouw route" />
        </div>
      </div>
    </div>
  );
}
