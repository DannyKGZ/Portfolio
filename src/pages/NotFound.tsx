import { useEffect } from 'react';

/** Страница 404 без роутера — сайт одностраничный, зависимость react-router не нужна. */
const NotFound = () => {
  useEffect(() => {
    document.title = '404 — страница не найдена | Рысбеков Руслан';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-6">
        <h1 className="text-6xl font-bold mb-4 text-foreground">404</h1>
        <p className="text-xl text-muted-foreground mb-6">Такой страницы нет</p>
        <a href="/" className="btn-primary inline-flex">
          Вернуться на главную
        </a>
      </div>
    </div>
  );
};

export default NotFound;
