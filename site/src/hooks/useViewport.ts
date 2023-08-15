import { useEffect, useState } from 'react';

export enum ViewportEnum {
  desktop = 'desktop',
  mobile = 'mobile',
  tablet = 'tablet',
}

export const getViewport = (): ViewportEnum => {
  const mediaQueryMobile = window.matchMedia(`(max-width: 767px)`);
  const mediaQueryTablet = window.matchMedia(`(max-width: 1024px)`);

  if (mediaQueryMobile.matches) {
    return ViewportEnum.mobile;
  }

  if (mediaQueryTablet.matches) {
    return ViewportEnum.tablet;
  }

  return ViewportEnum.desktop;
};

export const useViewport = () => {
  const [currentViewPort, setCurrentViewport] = useState<ViewportEnum>(ViewportEnum.desktop);

  useEffect(() => {
    const resize = () => {
      setCurrentViewport(getViewport());
    };

    resize();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return {
    isDesktop:
      currentViewPort != null ? currentViewPort === ViewportEnum.desktop : null,
    isTablet:
      currentViewPort != null ? currentViewPort === ViewportEnum.tablet : null,
    isMobile:
      currentViewPort != null ? currentViewPort === ViewportEnum.mobile : null,
  };
};
