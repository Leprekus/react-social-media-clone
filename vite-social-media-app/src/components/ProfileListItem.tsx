import React from 'react'
import { User } from '../../typings'

interface ProfileListItemProps { user: User }
export default function ProfileListItem({ user }:ProfileListItemProps) {
  console.log({ user })
  return (
    <div>ProfileListItem</div>
  )
}
