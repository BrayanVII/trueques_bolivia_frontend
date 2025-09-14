import React from 'react';

function ArticleList({ user, articulos }) {
  return (
    <div style={{ marginTop: '20px' }}>
      <h4>Artículos de {user.nombre}:</h4>
      <div>
        {articulos.length > 0 ? (
          articulos.map(a => (
            <div key={a.id} className="article-card">
              {a.nombre}
            </div>
          ))
        ) : (
          <p>No tiene artículos</p>
        )}
      </div>
    </div>
  );
}

export default ArticleList;
