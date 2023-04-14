import { forwardRef, useState, useImperativeHandle } from 'react'
import { Popup, DatePicker } from 'zarm'
import dayjs from 'dayjs'
type Props = {
  onSelect: (date: string) => void
  columnType: ('month' | 'year' | 'day' | 'meridiem' | 'hour' | 'minute' | 'second' | 'week' | 'week-day')[]
}
const PopupDate = forwardRef((props: Props, ref) => {
  const { columnType, onSelect } = props
  const [show, setShow] = useState(false)
  const [now, setNow] = useState(new Date())

  const choseMonth = (item: Date) => {
    setNow(item)
    setShow(false)
    if (columnType.includes('day')) {
      onSelect(dayjs(item).format('YYYY-MM-DD'))
    } else if (columnType.includes('month')) {
      onSelect(dayjs(item).format('YYYY-MM'))
    }
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        show() {
          setShow(true)
        },
        close() {
          setShow(false)
        }
      }
    },
    []
  )
  return (
    <Popup
      visible={show}
      direction="bottom"
      onMaskClick={() => setShow(false)}
      destroy={false}
      mountContainer={() => document.body}
    >
      <div>
        <DatePicker
          visible={show}
          value={now}
          columnType={columnType}
          onConfirm={choseMonth}
          onCancel={() => setShow(false)}
        />
      </div>
    </Popup>
  )
})

export default PopupDate
