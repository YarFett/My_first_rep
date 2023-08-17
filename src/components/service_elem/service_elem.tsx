import React from "react";

interface Service {
  id: number;
  create_date: string,
  viewtype_name: ViewType,
  software_registry: SoftwareRegistry,
}

interface ViewType{
  view: View[],
  type: Type[]
}

interface View {
  view_service: string
}

interface Type {
  type_service: string
}

interface SoftwareRegistry {
  id: number,
  service_name: string,
  short_producer: string,
  class_service: string,
}


export class ServiceElem extends React.Component<Service>{
  render() {
    return undefined;
  }
}
