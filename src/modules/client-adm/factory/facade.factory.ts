import ClientAdmFacade from "../facade/client-adm.facade";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUsecase from "../usecase/find-client/find-client.usecase";

export default class ClientAdmFacadeFactory {
  static create() {
    const clientRepository = new ClientRepository();
    const addClientUseCase = new AddClientUseCase(clientRepository);
    const findClientUseCase = new FindClientUsecase(clientRepository);
    const clientFacade = new ClientAdmFacade({
      addUseCase: addClientUseCase,
      findUseCase: findClientUseCase,
    });

    return clientFacade;
  }
}
