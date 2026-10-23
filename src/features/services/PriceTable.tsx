import { expressDelivery, services } from '../../data/business'
import { Price, PriceNotice } from './Price'
import styles from './PriceTable.module.css'

export function PriceTable() {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <caption className="visually-hidden">Price list</caption>
        <thead>
          <tr>
            <th scope="col">Service</th>
            <th scope="col">Note</th>
            <th scope="col" className={styles.right}>
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <th scope="row">
                {service.id === 'ironing' ? 'Ironing & Packing Only' : service.name}
                <span className={styles.local}>{service.localName}</span>
              </th>
              <td>{service.fabrics}</td>
              <td className={styles.right}>
                <Price amount={service.price} className={styles.price} />
              </td>
            </tr>
          ))}
          <tr className={styles.addon}>
            <th scope="row">
              {expressDelivery.name} (6 hrs)
              <span className={styles.local}>Add-on</span>
            </th>
            <td>{expressDelivery.availability}</td>
            <td className={styles.right}>
              <Price amount={expressDelivery.price} suffix="extra" className={styles.price} />
            </td>
          </tr>
        </tbody>
      </table>
      <PriceNotice className={styles.notice} />
    </div>
  )
}
