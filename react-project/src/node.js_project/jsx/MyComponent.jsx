import React, { useState } from 'react';
import LoginForm from './LoginFrom';

const MyComponent = () => {

  const [currentUser, setCurrentUser] = useState(null);

  // פונקציה לעדכון פרטי המשתמש
  const handleLogin = (userData) => {
    setCurrentUser(userData);
  };

  // פונקציה להתנתקות
  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div>
      {/* אם המשתמש מחובר, הצג את האזור האישי */}
      {currentUser ? (
        <div>
          <h2>שלום, {currentUser.email}!</h2>
          <button onClick={handleLogout}>התנתק</button>
        </div>
      ) : (
        // אם המשתמש לא מחובר, הצג טופס התחברות
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default MyComponent;