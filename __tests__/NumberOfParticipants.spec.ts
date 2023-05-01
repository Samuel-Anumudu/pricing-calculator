/*
import { mount } from '@vue/test-utils'
import NumberOfParticipants from '@/components/NumberOfParticipants.vue'

describe('NumberOfParticipants component', () => {
  it('emits an updateNumberOfParticipants event when numberOfParticipants is changed', async () => {
    const wrapper = mount(NumberOfParticipants)
    const numberOfParticipantsInput = wrapper.find('#numberOfParticipants')

    await numberOfParticipantsInput.setValue('10')

    expect(wrapper.emitted('updateNumberOfParticipants')).toBeTruthy()
    expect(wrapper.emitted('updateNumberOfParticipants')[0][0]).toMatchObject({
      numberOfParticipants: 10,
      additionalParticipants: 2
    })
  })

  it('updates additionalParticipants when numberOfParticipants is changed', async () => {
    const wrapper = mount(NumberOfParticipants)
    const numberOfParticipantsInput = wrapper.find('#numberOfParticipants')

    await numberOfParticipantsInput.setValue('5')

    expect(wrapper.vm.additionalParticipants).toBe(1)
  })
})

*/
