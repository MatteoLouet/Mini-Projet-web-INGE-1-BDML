import { useState } from "react";
import "./App.css";

// données pour le projet
// tableau d'objet car plus facile à manipuler pour la suite  
const Objectif = [
  { id: 0, nom: "Sédentaire", min: 0.8, max: 1.0 },
  { id: 1, nom: "Endurance", min: 1.2, max: 1.6 },
  { id: 2, nom: "Conservation de la masse musculaire", min: 1.6, max: 1.8 },
  { id: 3, nom: "Prise de masse musculaire", min: 1.8, max: 2.2 },
];

function Créer_tableau({ poidsMin, poidsMax, nbLignes, objectifChoisi }) {
  {/*On commence par calculer l'intervalle qu'on va mettre en place*/ }
  {/*Ensuite on ajoute chaque élément à la pile avec le pas*/ }
  function Repartir_poids() {
    const poids = [];
    const pas = (poidsMax - poidsMin) / (nbLignes - 1);
    for (let i = 0; i < nbLignes; i++) {
      poids.push(Math.round(poidsMin + i * pas));
    }
    return poids;
  }

  const Tableau_de_poids = Repartir_poids();

  // Fonction pour exporter en CSV
  const exporterCSV = () => {
    const objectifsAffiches = Objectif.filter((obj) => objectifChoisi === null || obj.id === objectifChoisi);

    // Pour chaque objectif qu'on affiche, on ajoute son nom en titre
    let csv = "Poids en kg";
    objectifsAffiches.forEach(obj => { csv += "," + obj.nom; });
    csv += "\n";

    // On parcourt chaque poids du tableau et on calcule et ajoute les protéines correspondante
    Tableau_de_poids.forEach(poids => {
      csv += poids + " kg";
      objectifsAffiches.forEach(obj => { csv += "," + Math.round(poids * obj.min) + " - " + Math.round(poids * obj.max) + " g/jour"; });
      csv += "\n";
    });

    // On transforme le tableau en object fichier 
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    // On crée un lien de téléchargement caché avec une adresse qui donne sur notre fichier, on enlève après pour que ce soit clean 
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "tableau_proteines.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  {/*Création du tableau avec une colonne par objectif, une ligne par poids, et la quantité de protéine par objectif*/ }
  {/*On parcourt la liste objectifs avec map, chaque itération on stocke dans obj, key est requis par React pour suivre l'élément*/ }
  {/*Ensuite pour chaque palier d'objectif, on calcule les protéines associées en utilisant la même méthode de parcours*/ }
  {/*formule de calcul est le poids fois l'objectif min - le poids fois l'objectif max*/ }
  return (
    <div>
      <button onClick={exporterCSV} style={{
        marginTop: "20px",
        padding: "10px 20px",
        backgroundColor: "#6366F1",
        color: "#F1F5F9",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "0.9rem",
        fontWeight: "600"
      }}>
        Exporter en CSV
      </button>

      <table border="1" style={{ borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Poids en kg</th>
            {Objectif.filter((obj) => objectifChoisi === null || obj.id === objectifChoisi).map((obj) => (<th key={obj.id}>{obj.nom}</th>))}
          </tr>
        </thead>
        <tbody>
          {Tableau_de_poids.map((poids) => (
            <tr key={poids}>
              <td>{poids} kg</td>
              {Objectif.filter((obj) => objectifChoisi === null || obj.id === objectifChoisi).map((obj) =>
              (<td key={obj.id}>{Math.round(poids * obj.min)} – {Math.round(poids * obj.max)} g/jour
              </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  // Tableau car useState retourne tjrs un tableau de 2 éléments
  const [poidsMin, setPoidsMin] = useState("");
  const [poidsMax, setPoidsMax] = useState("");
  const [nbLignes, setNbLignes] = useState("");
  const [objectifChoisi, setObjectifChoisi] = useState(null);


  // On vérifie que toutes les valeurs sont valides avant d'afficher le tableau
  const pret =
    poidsMin !== "" &&
    poidsMax !== "" &&
    nbLignes !== "" &&
    poidsMax > poidsMin &&
    nbLignes >= 2;

  return (
    <div>
      {/* Cascades d'images sur les côtés */}
      {/* Création d'un tableau qu'on va remplir de la même image pour faire défiler les éléments*/}
      <div className="cascade-left">
        {[...Array(10)].map((_, i) => (
          <img key={i} src="ronnie.png" alt="" />
        ))}
      </div>

      <div className="cascade-right">
        {[...Array(10)].map((_, i) => (
          <img key={i} src="ronnie.png" alt="" />
        ))}
      </div>

      <h1>Mini-projet développement web</h1>
      <p class="subtitle">Mattéo LOUET INGÉ 1 BDML 2</p>
      {/* fonction qui permet l'input de donnée */}
      <h2>Saisissez votre poids</h2>
      {/* Input du poids minimal */}
      {/* A chaque saisie l'event e récupére la valeur et la change */}
      <input
        type="number"
        placeholder="Poids min"
        value={poidsMin}
        onChange={(e) => setPoidsMin(Number(e.target.value))}
      />
      {/* Input du poids maximal avec saisie sécurisée */}
      {/* On untilise onBlur et pas OnChange sinon on ne peut pas commencer par le minimum */}
      <input
        type="number"
        placeholder="Poids max"
        value={poidsMax}
        onChange={(e) => {
          const val = Number(e.target.value); {/* On stocke ailleurs temporairement pour vérifier si c'est bien supérieur au poids minimum */ }
          setPoidsMax(val);
        }}
        onBlur={() => {
          if (poidsMin !== "" && poidsMin >= poidsMax) {
            alert("Le poids minimal doit être inférieur au maximal");
            setPoidsMax("");
          }
        }}
      />
      <p>Min: {poidsMin} | Max: {poidsMax}</p>

      <h2>Combien de lignes voulez-vous ?</h2>
      <input
        type="number"
        placeholder="Nombre de lignes"
        value={nbLignes}
        onChange={(e) => setNbLignes(Number(e.target.value))}
      />
      <p>Nombre de lignes : {nbLignes}</p>

      <h2>Choisissez votre objectif</h2>
      <select onChange={(e) => setObjectifChoisi(e.target.value === "" ? null : Number(e.target.value))}>
        <option value="">-- Tous les objectifs --</option>
        {Objectif.map((obj) => (
          <option key={obj.id} value={obj.id}>{obj.nom}</option>
        ))}
      </select>

      {/* On n'affiche le tableau que si tout est valide */}
      {pret ? (
        <Créer_tableau
          poidsMin={poidsMin}
          poidsMax={poidsMax}
          nbLignes={nbLignes}
          objectifChoisi={objectifChoisi}
        />
      ) : (
        <p style={{ color: "gray" }}>
          Remplissez les 3 champs pour afficher le tableau.
        </p>
      )}
    </div>
  );
}

export default App;