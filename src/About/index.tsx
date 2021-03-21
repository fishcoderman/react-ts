import { useRequest } from 'ahooks';
import { message } from 'antd';
import { FC, useState } from 'react';

function changeUsername(username: string): Promise<{ success: boolean }> {
  console.log(username);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
}

const About:FC = () => {
  const [state, setState] = useState('');
  const { loading, run } = useRequest(changeUsername, {
    manual: true,
    onSuccess: (result, params) => {
      if (result.success) {
        setState('');
        message.success(`The username was changed to "${params[0]}" !`);
      }
    },
  });

  return (
    <div style={{ padding: 20, border: '1px solid #ccc', width: 600 }}>
      <input
        onChange={(e) => setState(e.target.value)}
        value={state}
        placeholder="Please enter username"
        style={{ width: 240, marginRight: 16 }}
      />
      <button disabled={loading} type="button" onClick={() => run(state)}>
        {loading ? 'loading' : 'Edit'}
      </button>
    </div>
  );
};

export default About
