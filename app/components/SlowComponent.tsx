import React from "react";

const SlowComponent = async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    return <div>SlowComponent loaded</div>;
};

export default SlowComponent;