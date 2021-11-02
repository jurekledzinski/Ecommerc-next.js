import {
  TableWrapper,
  TdTable,
  TrTable,
} from '../muistyles/TableDetailsProduct.styles';

const TableDetailsProduct = () => {
  return (
    <TableWrapper>
      <tbody>
        <TrTable>
          <TdTable colSpan="2" className="feature-name">
            <h4>Basic information</h4>
          </TdTable>
        </TrTable>
        <TrTable>
          <TdTable>Brand</TdTable>
          <TdTable>XIAOMI</TdTable>
        </TrTable>
        <TrTable>
          <TdTable>Colors</TdTable>
          <TdTable>Black</TdTable>
        </TrTable>
      </tbody>
    </TableWrapper>
  );
};

export default TableDetailsProduct;
