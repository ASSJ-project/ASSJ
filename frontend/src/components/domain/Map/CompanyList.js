import styled from 'styled-components';
import { FixedSizeList } from 'react-window';
import { useNavigate } from 'react-router-dom';

const Container = styled.ul`
  margin: 0;
  padding: 0;
`;

const Item = styled.div`
  background-color: #f5f5f5;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  margin: 30px;
  padding: 5px;
  cursor: pointer;
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

const Box = styled.div`
  display: flex;
  justify-content: space-between;
`;

function CompanyList({ data }) {
  console.log(data);
  const itemSize = 120;
  const itemCount = data.length;
  const navigate = useNavigate();

  function handleClick() {
    navigate('/test');
  }

  const Row = ({ index, style }) => (
    <Container style={style}>
      <Item onClick={handleClick}>
        <Title>{data[index].company}</Title>
        <Content style={{ marginBottom: '2em' }}>{data[index].title}</Content>
        <Content>{data[index].jobsCd}</Content>
        <Box>
          <Content>
            {data[index].salTpNm} {data[index].sal}
          </Content>
          <Content style={{ fontSize: '0.3em' }}>{data[index].closeDt}</Content>
        </Box>
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
