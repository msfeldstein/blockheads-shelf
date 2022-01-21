import React from 'react';
import { PartTile } from './PartsDisplay';
import { IndividualPart } from './types';

export default function GrailBuilderPartTileV2({
  isSelected,
  onClick,
  token
}: {
  isSelected: boolean;
  onClick: (token: IndividualPart) => void;
  token: IndividualPart;
}) {
  return (
    <div
      className={`grail-builder__part ${isSelected ? 'grail-builder__part--selected' : ''}`}
      onClick={() => onClick(token)}
    >
      <PartTile
        part={{ svg: token.rawSVG, label: '' }}
        size="100"
      />
    </div>
  )
}
