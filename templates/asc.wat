(module
 (type $none_=>_i32 (func (result i32)))
 (type $i32_i32_=>_none (func (param i32 i32)))
 (type $none_=>_none (func))
 (global $~lib/memory/__data_end i32 (i32.const 8))
 (global $~lib/memory/__stack_pointer (mut i32) (i32.const 16392))
 (global $~lib/memory/__heap_base i32 (i32.const 16392))
 (memory $0 0)
 (table $0 1 funcref)
 (elem $0 (i32.const 1))
 (export "init" (func $templates/default-painter/init))
 (export "next" (func $templates/default-painter/next))
 (export "getLastActionColor" (func $templates/default-painter/getLastActionColor))
 (export "getLastActionDirection" (func $templates/default-painter/getLastActionDirection))
 (export "memory" (memory $0))
 (func $templates/default-painter/init (param $0 i32) (param $1 i32)
  nop
 )
 (func $templates/default-painter/next
  nop
 )
 (func $templates/default-painter/getLastActionColor (result i32)
  i32.const 16711935
 )
 (func $templates/default-painter/getLastActionDirection (result i32)
  i32.const 2
 )
)
