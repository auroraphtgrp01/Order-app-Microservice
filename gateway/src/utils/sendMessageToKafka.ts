import { ClientKafka } from '@nestjs/microservices';
import { Observable, from, map } from 'rxjs';

export const sendMessageToKafka = (
  client: ClientKafka,
  topicName: string,
  data: any,
): Observable<any> => {
  return from(
    client.send(topicName, data).pipe(
      map((data) => {
        return data;
      }),
    ),
  );
};
