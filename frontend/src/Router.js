// 리액트 라우터 설정
const Router = () => {
  const { accessToken } = useContext(sessionStorage.getItem("access_token"));

  return (
    <Routes>
      {accessToken ? (
        <Route element={<NavLayout />}>
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/reservation" />} />
        </Route>
      ) : (
        <>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="*" element={<Navigate to="/signin" />} />
        </>
      )}
    </Routes>
  );
};

export default Router;
