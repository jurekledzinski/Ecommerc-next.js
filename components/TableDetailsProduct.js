import React, { Fragment, useContext } from 'react';

import { StoreContext } from '../utils/store';

import {
  TableWrapper,
  TdTable,
  TrTable,
} from '../muistyles/TableDetailsProduct.styles';

const TableDetailsProduct = () => {
  const { stateDetailsProduct } = useContext(StoreContext);
  const { details } = stateDetailsProduct;

  return (
    <TableWrapper>
      <tbody>
        {details &&
          details.map((item1, index) => (
            <Fragment key={index}>
              <TrTable>
                <TdTable colSpan="2" className="feature-name">
                  <h4>{item1.title}</h4>
                </TdTable>
              </TrTable>
              {Object.keys(item1)
                .filter((item2) => item2 !== 'title')
                .map((item3) => (
                  <TrTable key={item3}>
                    <TdTable>
                      {item3.match(/2|3|4|5/g)
                        ? item3 + 'gband'
                        : item3.charAt(0).toUpperCase() + item3.substring(1)}
                    </TdTable>
                    <TdTable>{item1[item3]}</TdTable>
                  </TrTable>
                ))}
            </Fragment>
          ))}
      </tbody>
    </TableWrapper>
  );
};

export default TableDetailsProduct;
