import dynamic from 'next/dynamic';

const withClientSideRendering = (Component) => {
  return dynamic(() => Promise.resolve(Component), { ssr: false });
};

export default withClientSideRendering;
