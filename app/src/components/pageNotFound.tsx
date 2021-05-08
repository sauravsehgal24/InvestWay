import * as React from "react";

type IPageNotFoundProps = {
    test: string;
};

const PageNotFound: React.FC<IPageNotFoundProps> = (props) => {
    return <h1>SORRY, PAGE NOT FOUND :(</h1>;
};
export default PageNotFound;
