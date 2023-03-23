import styled from 'styled-components';
import { FixedSizeList } from 'react-window';

const Container = styled.ul`
  margin: 0;
  padding: 0;
`;

const Item = styled.div`
  background-color: #f5f5f5;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  margin-bottom: 16px;
  padding: 16px;
`;

const Title = styled.p`
  color: #9588e0;
  font-size: 16px;
  font-weight: bold;
  margin: 0;
`;

const Content = styled.p`
  color: #333;
  font-size: 14px;
  margin: 8px 0 0 0;
`;

function CompanyList({ data }) {
  const itemSize = 120;
  const itemCount = data.length;

  const Row = ({ index, style }) => (
    <Container style={style}>
      <Item>
        <Title>{data[index].company}</Title>
        <Content>{data[index].title}</Content>
        <Content>급여: {data[index].sal}</Content>
      </Item>
    </Container>
  );

  return (
    <FixedSizeList
      height={window.innerHeight}
      width={window.innerWidth}
      itemCount={itemCount}
      itemSize={itemSize}
    >
      {Row}
    </FixedSizeList>
  );
}

export default CompanyList;
