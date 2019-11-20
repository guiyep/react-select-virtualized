import React, { useCallback, useState } from 'react';

const FastHover = ({ children }) => {
  const [isHovering, setHovering] = useState(false);

  const onMouseOverHandler = useCallback(() => setHovering(true), []);

  const onMouseOutHandler = useCallback(() => setHovering(false), []);

  return (
    <div onMouseOver={onMouseOverHandler} onMouseOut={onMouseOutHandler}>
      {children({ isHovering })}
    </div>
  );
};

FastHover.displayName = 'FastHover';

export default FastHover;
