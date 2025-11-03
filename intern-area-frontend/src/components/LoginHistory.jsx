import React from 'react';

function LoginHistory({ history }) {
  return (
    <div className="login-history">
      <h3>Login History</h3>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            {item.date} - {item.device} - {item.os} - {item.ip}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LoginHistory;
