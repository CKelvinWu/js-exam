import React from 'react';
import styles from './ConsoleWidget.module.scss';

const isError = e =>
  e &&
  e.stack &&
  e.message &&
  typeof e.stack === 'string' &&
  typeof e.message === 'string';

const Text = ({ text }) => (
  <>{`${text}`.trim() === '' ? <br /> : `${text}`.trim()}</>
);

const ConsoleWidget = ({ data, className }) => (
  <div className={`${styles['console-widget']} ${className || ''}`}>
    {data.map((text, index) => (
      <div className={styles.console} key={index}>
        <div className={styles.text}>
          {typeof text === 'object' && !isError(text) ? (
            JSON.stringify(text, null, 2)
          ) : (
            <Text text={text} />
          )}
        </div>
      </div>
    ))}
  </div>
);

export default ConsoleWidget;
