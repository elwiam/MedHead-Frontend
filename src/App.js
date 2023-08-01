import React, { useState } from 'react';


function IndexPage() {
  const [address, setAddress] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Vérification des champs et validation des données

    // Utiliser l'API Nominatim pour géocoder l'adresse
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);
      const data = await response.json();

      if (data.length > 0) {
        const latitude = data[0].lat;
        const longitude = data[0].lon;

        // Utiliser la liste JSON d'hôpitaux fournie dans l'URL
        const hospitals = [
          {
            "id": 1,
            "name": "Hôpital Bichat-Claude Bernard",
            "latitude": 48.8964,
            "longitude": 2.3318,
            "availableBeds": 100,
            "address": "46 Rue Henri Huchard",
            "postalCode": "75018",
            "specialities": [
              { "id": 1, "name": "Cardiology" },
              { "id": 2, "name": "Neurology" }
            ]
          },
          {
            "id": 2,
            "name": "Hôpital Pitié-Salpêtrière",
            "latitude": 48.8375,
            "longitude": 2.3624,
            "availableBeds": 50,
            "address": "47-83 Boulevard de l'Hôpital",
            "postalCode": "75013",
            "specialities": [
              { "id": 2, "name": "Neurology" },
              { "id": 3, "name": "Orthopedics" }
            ]
          },
          {
            "id": 3,
            "name": "Hôpital Necker-Enfants Malades",
            "latitude": 48.8472,
            "longitude": 2.3122,
            "availableBeds": 200,
            "address": "149 Rue de Sèvres",
            "postalCode": "75015",
            "specialities": [
              { "id": 3, "name": "Orthopedics" }
            ]
          },
          {
            "id": 4,
            "name": "Hôpital Cochin",
            "latitude": 48.8386,
            "longitude": 2.3365,
            "availableBeds": 150,
            "address": "27 Rue du Faubourg Saint-Jacques",
            "postalCode": "75014",
            "specialities": []
          },
          {
            "id": 5,
            "name": "Hôpital Saint-Louis",
            "latitude": 48.8739,
            "longitude": 2.3631,
            "availableBeds": 80,
            "address": "1 Avenue Claude Vellefaux",
            "postalCode": "75010",
            "specialities": []
          },
          {
            "id": 6,
            "name": "Hôpital Henri Mondor",
            "latitude": 48.8057,
            "longitude": 2.4471,
            "availableBeds": 120,
            "address": "51 Avenue du Maréchal de Lattre de Tassigny",
            "postalCode": "94010",
            "specialities": []
          }
        ];
        
          // ... Ajoutez les autres hôpitaux ici ...
       

        // Calculer la distance entre votre position et celle de chaque hôpital
        hospitals.forEach(hospital => {
          const hospitalLatitude = hospital.latitude;
          const hospitalLongitude = hospital.longitude;
          const distance = calculateDistance(latitude, longitude, hospitalLatitude, hospitalLongitude);
          hospital.distance = distance;
        });

        // Trier les hôpitaux en fonction de la distance
        hospitals.sort((a, b) => a.distance - b.distance);

        // Mettre à jour les résultats
        setResults(hospitals);
      } else {
        setResults([]);
        // Afficher un message d'erreur approprié
      }
    } catch (error) {
      console.log(error);
      // Afficher un message d'erreur approprié
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // Calcul de la distance entre deux coordonnées géographiques
    const R = 6371; // Rayon de la Terre en kilomètres
  
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
  
    return distance;
  };
  
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const afficherFormulaireReservation = (hospitalId, specialityId) => {
    // Rediriger l'utilisateur vers la page de réservation en passant les paramètres dans l'URL
    window.location.href = `reservation.html?hospitalId=${encodeURIComponent(hospitalId)}&specialityId=${encodeURIComponent(specialityId)}`;
  };

  return (
    <div>
      <h1>Recherche d'hôpitaux</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          placeholder="Adresse"
        />
        <input
          type="text"
          value={speciality}
          onChange={(event) => setSpeciality(event.target.value)}
          placeholder="Spécialité"
        />
        <button type="submit">Rechercher</button>
      </form>

      <div id="results">
        {results.map(hospital => (
          <div key={hospital.id} className="card">
            <div className="card-body">
              <h5 className="card-title">{hospital.name}</h5>
              <p className="card-text">Lits disponibles : {hospital.availableBeds}</p>
              <button
                className="btn btn-primary reservation-button"
                onClick={() => afficherFormulaireReservation(hospital.id, speciality)}
              >
                Réserver
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IndexPage;
