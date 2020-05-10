import React from 'react';
import ReactMapGL from 'react-map-gl';

const mapStyle = {
  version: 8,
  sources: {
    'raster-tiles': {
      type: 'raster',
      tiles: [`${window.location.pathname}map-tiles/{z}/{x}/{y}.png`],
      tileSize: 256,
    },
  },
  layers: [
    {
      id: 'simple-tiles',
      type: 'raster',
      source: 'raster-tiles',
      minzoom: 0,
      maxzoom: 22,
    },
  ],
};

const App = () => {
  const container = React.useRef<any>(null);
  const [viewport, setViewport] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
    latitude: 0,
    longitude: 0,
    bearing: 0,
    pitch: 0,
    zoom: 0,
  });

  React.useEffect(() => {
    // @ts-ignore
    const resize = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      setViewport(v => ({ ...v, width, height }));
    });
    resize.observe(container.current);
  }, [container]);

  return (
    <div ref={container} style={{ width: '100vw', height: '100vh' }}>
      <ReactMapGL
        {...viewport}
        mapStyle={mapStyle}
        minZoom={1}
        maxZoom={4.5}
        onViewportChange={viewport => {
          setViewport(v => ({
            ...viewport,
            bearing: 0,
            pitch: 0,
          }));
        }}
      />
    </div>
  );
};

export default App;
