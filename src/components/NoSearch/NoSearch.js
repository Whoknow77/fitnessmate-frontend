import { NoSearchWrapper } from "./StyledNoSearch";

const NoSearch = () => {
  return (
    <NoSearchWrapper>
      <div className="warningImg"></div>
      <span className="warningText">
        앗, 찾으시는 결과가 없네요
        <br />
        혹시 다른 키워드로 검색해보는 건 어떠세요
      </span>
    </NoSearchWrapper>
  );
};

export default NoSearch;
