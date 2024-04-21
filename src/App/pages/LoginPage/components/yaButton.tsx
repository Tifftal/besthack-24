import React, { useEffect } from 'react';

const YaOAuthButton = () => {
  useEffect(() => {
    const initYaAuthSuggest = () => {
      return new Promise((resolve, reject) => {
        window.YaAuthSuggest.init({
          client_id: '82982bbb8cb04364b5f42a3536567626',
          response_type: 'token',
          redirect_uri: 'https://oauth.yandex.ru/verification_code'
        }, 'https://oauth.yandex.ru', {
          view: 'button',
          parentId: 'container',
          buttonView: 'main',
          buttonTheme: 'light',
          buttonSize: 'm',
          buttonBorderRadius: 0
        })
        .then(result => {
          return result.handler();
        })
        .then(data => {
          console.log('Сообщение с токеном: ', data);
          // Здесь можно установить состояние компонента с данными, если нужно
          resolve(data);
        })
        .catch(error => {
          console.log('Что-то пошло не так: ', error);
          // Здесь можно обработать ошибку, если нужно
          reject(error);
        });
      });
    };

    initYaAuthSuggest();
  }, []);

  return (
    <div id="container"></div>
  );
};

export default YaOAuthButton;
