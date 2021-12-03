const ErrorNotDeployed = (contract, error) => {
    console.error(`${contract.contractName} contract is not deployed to this network.`);
    console.error(error);
};

export default ErrorNotDeployed;