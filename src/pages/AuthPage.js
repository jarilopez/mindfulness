import React, { useState } from 'react';
import Header from '../components/Header'; 
import Button from '../components/Button'; 
import '../styles/AuthPage.css';


const AuthPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado', { fullName, email, password });
  };

  return (
    <div>
      <Header logo="/logo.png" links={[]} />
      <main className="text-center mt-5">
        <h2>Registre / Inici de Sessió</h2>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">Nom complet</label>
            <input
              id="fullName"
              type="text"
              placeholder="Nom complet"
              className="form-control"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correu electrònic</label>
            <input
              id="email"
              type="email"
              placeholder="Correu electrònic"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contrasenya</label>
            <input
              id="password"
              type="password"
              placeholder="Contrasenya"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button text="Crear Compte" type="submit" className="success" />
        </form>
      </main>
    </div>
  );
};

export default AuthPage;
