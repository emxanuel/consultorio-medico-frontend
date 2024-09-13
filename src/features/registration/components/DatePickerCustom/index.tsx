import { Button, Calendar, CalendarCell, CalendarGrid, DateInput, DatePicker, DateSegment, Dialog, Group, Heading, Label, Popover } from 'react-aria-components';

const DatePickerCustom = () => {
    return (
        <DatePicker className="flex">
            <Label>Date</Label>
            <Group>
                <DateInput>
                    {(segment) => <DateSegment segment={segment} />}
                </DateInput>
                <Button>▼</Button>
            </Group>
            <Popover>
                <Dialog>
                    <Calendar>
                        <header>
                            <Button slot="previous">◀</Button>
                            <Heading />
                            <Button slot="next">▶</Button>
                        </header>
                        <CalendarGrid>
                            {(date) => <CalendarCell date={date} />}
                        </CalendarGrid>
                    </Calendar>
                </Dialog>
            </Popover>
        </DatePicker>
    )
}

export default DatePickerCustom;