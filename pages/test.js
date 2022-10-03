import { useEffect } from 'react';
import mySanityClient from '../utils/client';

export default function test() {
  useEffect(() => {
    const run = async () => {
      const patch = await mySanityClient
        .patch('83d43ba7-41d4-4bf6-93e6-83b32aeb4800') // Document ID to patch
        .set({ bag: '1111111111' }) // Shallow merge
        .commit() // Perform the patch and return a promise
        .then(() => {
          console.log('success');
        })
        .catch((err) => {
          console.error('Oh no, the update failed: ', err.message);
        });
    };
    run();
  }, []);

  return <div>test</div>;
}
