import qs from 'qs'
import request from './request'

export async function getHeaderNotices () {
  return request('/api/notices', {})
}

export async function getCharts () {
  return request('/api/charts', {})
}

export async function getUserCurrent () {
  return request('/api/userCurrent', {})
}

export async function getTags () {
  return request('/api/tags', {})
}

export async function getNotice () {
  return request('/api/project/notice', {})
}

export async function getActivities () {
  return request('/api/activities', {})
}

export async function basicFormSubmit (params) {
  return request('/api/form-basic', {
    method: 'POST',
    body: params
  })
}

export async function getTableList (params) {
  return request(`/api/table-list?${qs.stringify(params)}`, {})
}

export async function addTableList (params) {
  return request('/api/table-list-put', {
    method: 'PUT',
    body: params
  })
}

export async function deleteTableList (params) {
  return request('/api/table-list-delete', {
    method: 'POST',
    body: params
  })
}

export async function getFakeList (params) {
  return request(`/api/fake-list?${qs.stringify(params)}`, {})
}

export async function getBasicProfile () {
  return request('/api/profile/basic', {})
}

export async function getAdvancedProfile () {
  return request('/api/profile/advanced', {})
}

export async function query (code) {
  return request(`/api/${code}`, {})
}
