import React, { ReactNode } from 'react';

interface PopUpLayerProps {
  children: ReactNode;
  top?: string,
  left?: string,
  right?: string,
  bottom?: string
}

const PopUpLayer: React.FC<PopUpLayerProps> = ({ 
    children, 
    top = 'top-0', 
    left = 'left-0', 
    right = 'right-0', 
    bottom = 'bottom-0' 
  }) => {
    
  return (
    <div
      className={`fixed overflow-y-scroll ${top} ${left} ${right} ${bottom} p-2 bg-black bg-opacity-90 flex z-50`}
    >
      {children}
    </div>
  );
};

export default PopUpLayer;