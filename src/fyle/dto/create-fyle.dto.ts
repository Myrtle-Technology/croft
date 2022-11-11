export class CreateFyleDto {
  name: string;
  originalName: string;
  path: string;
  extension: string;
  url: string;
  mimeType: string;
  accountID: string;
  environment: string | string[];
}
