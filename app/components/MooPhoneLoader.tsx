"use client";

export function MooPhoneLoader() {
  return (
    <div aria-busy="true" aria-label="Загрузка демо" className="moo-ds-loader">
      <div className="moo-ds-loader-logo" aria-hidden="true">
        <span className="moo-ds-loader-face">
          <i />
          <i />
        </span>
        <strong>MOO</strong>
      </div>
      <p className="moo-ds-loader-text">Запуск Mini App…</p>
    </div>
  );
}
