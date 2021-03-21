import React, { useState, FC } from 'react';
import { useUnmountedRef } from 'ahooks';

interface VisiblePros {
  setVisible: () => void
}

const Button: FC<VisiblePros> = ({ setVisible } ) => {
  const unmountRef: { current: boolean } = useUnmountedRef();
  const [text, setText] = useState('I am mounted');
  const handleClick = async () => {
    await setVisible();
    setText('I am unmounted');
  };
  return <button onClick={handleClick}>{text}</button>;
};

const BasTable = () => {
  const [visible, setVisible] = useState(true);
  return (
    <div>
      click the button to unmount it
      <br />
      {visible ? <Button setVisible={() => setVisible(false)} /> : 'nothing'}
    </div>
  );
};


export default BasTable;