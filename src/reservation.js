import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

function IndexPage() {
  const [address, setAddress] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [results, setResults] = useState([]);
  const { hospitalId, specialityId } = useParams();
  const history = useHistory();

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
          // ...
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

  const makeReservation = () => {
    // Demander les détails de réservation (nom du patient, numéro de téléphone, etc.)
    const patientName = prompt('Nom du patient');
    const phoneNumber = prompt('Numéro de téléphone');
    const numPatients = prompt('Nombre de patients');
    const numBeds = prompt('Nombre de lits nécessaires');

    const reservationRequest = {
      patientName: patientName,
      phoneNumber: phoneNumber,
      numPatients: numPatients,
      numBeds: numBeds,
      hospitalId: hospitalId,
      specialityId: specialityId
    };

    // Effectuer une requête POST vers votre API Spring Boot
    fetch('/reservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reservationRequest)
    })
      .then(response => response.json())
      .then(data => {
        // Traitez la réponse de votre API
        console.log(data);
        // Affichez le message de succès à l'aide de la bibliothèque SweetAlert ou d'autres méthodes

        // Rediriger l'utilisateur vers la page de confirmation de réservation
        history.push('/confirmation');
      })
      .catch(error => {
        // Gérez les erreurs
        console.log(error);
      });
  };

  const afficherFormulaireReservation = (hospitalId, specialityId) => {
    // Rediriger l'utilisateur vers la page de réservation en passant les paramètres dans l'URL
    history.push(`/reservation/${encodeURIComponent(hospitalId)}/${encodeURIComponent(specialityId)}`);
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
