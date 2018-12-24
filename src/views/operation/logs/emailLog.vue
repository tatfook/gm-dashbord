<template>
  <base-crud resource='NoticeLog' log="email"/>
</template>

<script>
import BaseCRUD from '@/components/BaseCRUD'

export default {
  components: {
    'base-crud': BaseCRUD
  }
}
</script>
