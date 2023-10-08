enum DBTable {
  Accounts = "accounts",
}
enum AccountsColumn {
  Id = "id",
  AccessToken = "accessToken",
  Status = "status",
  IsActive = "isActive",
  TrackAttributeId = "trackAttributeId",
  PersonFrom = "personFrom",
  PhoneFrom = "phoneFrom",
  ZipFrom = "zipFrom",
  AddressFrom = "addressFrom",
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
}

// Взято из Sequilize
enum OpType {
  /**
   * Operator -|- (PG range is adjacent to operator)
   *
   * ```js
   * [Op.adjacent]: [1, 2]
   * ```
   * In SQL
   * ```sql
   * -|- [1, 2)
   * ```
   */
  adjacent = "adjacent",
  /**
   * Operator ALL
   *
   * ```js
   * [Op.gt]: {
   *  [Op.all]: literal('SELECT 1')
   * }
   * ```
   * In SQL
   * ```sql
   * > ALL (SELECT 1)
   * ```
   */
  all = "all",
  /**
   * Operator AND
   *
   * ```js
   * [Op.and]: {a: 5}
   * ```
   * In SQL
   * ```sql
   * AND (a = 5)
   * ```
   */
  and = "and",
  /**
   * Operator ANY ARRAY (PG only)
   *
   * ```js
   * [Op.any]: [2,3]
   * ```
   * In SQL
   * ```sql
   * ANY ARRAY[2, 3]::INTEGER
   * ```
   *
   * Operator LIKE ANY ARRAY (also works for iLike and notLike)
   *
   * ```js
   * [Op.like]: { [Op.any]: ['cat', 'hat']}
   * ```
   * In SQL
   * ```sql
   * LIKE ANY ARRAY['cat', 'hat']
   * ```
   */
  any = "any",
  /**
   * Operator BETWEEN
   *
   * ```js
   * [Op.between]: [6, 10]
   * ```
   * In SQL
   * ```sql
   * BETWEEN 6 AND 10
   * ```
   */
  between = "between",
  /**
   * With dialect specific column identifiers (PG in this example)
   *
   * ```js
   * [Op.col]: 'user.organization_id'
   * ```
   * In SQL
   * ```sql
   * = "user"."organization_id"
   * ```
   */
  col = "col",
  /**
   * Operator <@ (PG array contained by operator)
   *
   * ```js
   * [Op.contained]: [1, 2]
   * ```
   * In SQL
   * ```sql
   * <@ [1, 2)
   * ```
   */
  contained = "contained",
  /**
   * Operator @> (PG array contains operator)
   *
   * ```js
   * [Op.contains]: [1, 2]
   * ```
   * In SQL
   * ```sql
   * @> [1, 2)
   * ```
   */
  contains = "contains",
  /**
   * Operator LIKE
   *
   * ```js
   * [Op.endsWith]: 'hat'
   * ```
   * In SQL
   * ```sql
   * LIKE '%hat'
   * ```
   */
  endsWith = "endsWith",
  /**
   * Operator =
   *
   * ```js
   * [Op.eq]: 3
   * ```
   * In SQL
   * ```sql
   * = 3
   * ```
   */
  eq = "eq",
  /**
   * Operator >
   *
   * ```js
   * [Op.gt]: 6
   * ```
   * In SQL
   * ```sql
   * > 6
   * ```
   */
  gt = "gt",
  /**
   * Operator >=
   *
   * ```js
   * [Op.gte]: 6
   * ```
   * In SQL
   * ```sql
   * >= 6
   * ```
   */
  gte = "gte",
  /**
   * Operator ILIKE (case insensitive) (PG only)
   *
   * ```js
   * [Op.iLike]: '%hat'
   * ```
   * In SQL
   * ```sql
   * ILIKE '%hat'
   * ```
   */
  iLike = "iLike",
  /**
   * Operator IN
   *
   * ```js
   * [Op.in]: [1, 2]
   * ```
   * In SQL
   * ```sql
   * IN [1, 2]
   * ```
   */
  in = "in",
  /**
   * Operator ~* (PG only)
   *
   * ```js
   * [Op.iRegexp]: '^[h|a|t]'
   * ```
   * In SQL
   * ```sql
   * ~* '^[h|a|t]'
   * ```
   */
  iRegexp = "iRegexp",
  /**
   * Operator IS
   *
   * ```js
   * [Op.is]: null
   * ```
   * In SQL
   * ```sql
   * IS null
   * ```
   */
  is = "is",
  /**
   * Operator LIKE
   *
   * ```js
   * [Op.like]: '%hat'
   * ```
   * In SQL
   * ```sql
   * LIKE '%hat'
   * ```
   */
  like = "like",
  /**
   * Operator <
   *
   * ```js
   * [Op.lt]: 10
   * ```
   * In SQL
   * ```sql
   * < 10
   * ```
   */
  lt = "lt",
  /**
   * Operator <=
   *
   * ```js
   * [Op.lte]: 10
   * ```
   * In SQL
   * ```sql
   * <= 10
   * ```
   */
  lte = "lte",
  /**
   * Operator @@
   *
   * ```js
   * [Op.match]: Sequelize.fn('to_tsquery', 'fat & rat')`
   * ```
   * In SQL
   * ```sql
   * @@ to_tsquery('fat & rat')
   * ```
   */
  match = "match",
  /**
   * Operator !=
   *
   * ```js
   * [Op.ne]: 20
   * ```
   * In SQL
   * ```sql
   * != 20
   * ```
   */
  ne = "ne",
  /**
   * Operator &> (PG range does not extend to the left of operator)
   *
   * ```js
   * [Op.noExtendLeft]: [1, 2]
   * ```
   * In SQL
   * ```sql
   * &> [1, 2)
   * ```
   */
  noExtendLeft = "noExtendLeft",
  /**
   * Operator &< (PG range does not extend to the right of operator)
   *
   * ```js
   * [Op.noExtendRight]: [1, 2]
   * ```
   * In SQL
   * ```sql
   * &< [1, 2)
   * ```
   */
  noExtendRight = "noExtendRight",
  /**
   * Operator NOT
   *
   * ```js
   * [Op.not]: true
   * ```
   * In SQL
   * ```sql
   * IS NOT TRUE
   * ```
   */
  not = "not",
  /**
   * Operator NOT BETWEEN
   *
   * ```js
   * [Op.notBetween]: [11, 15]
   * ```
   * In SQL
   * ```sql
   * NOT BETWEEN 11 AND 15
   * ```
   */
  notBetween = "notBetween",
  /**
   * Operator NOT ILIKE (case insensitive) (PG only)
   *
   * ```js
   * [Op.notILike]: '%hat'
   * ```
   * In SQL
   * ```sql
   * NOT ILIKE '%hat'
   * ```
   */
  notILike = "notILike",
  /**
   * Operator NOT IN
   *
   * ```js
   * [Op.notIn]: [1, 2]
   * ```
   * In SQL
   * ```sql
   * NOT IN [1, 2]
   * ```
   */
  notIn = "notIn",
  /**
   * Operator !~* (PG only)
   *
   * ```js
   * [Op.notIRegexp]: '^[h|a|t]'
   * ```
   * In SQL
   * ```sql
   * !~* '^[h|a|t]'
   * ```
   */
  notIRegexp = "notIRegexp",
  /**
   * Operator NOT LIKE
   *
   * ```js
   * [Op.notLike]: '%hat'
   * ```
   * In SQL
   * ```sql
   * NOT LIKE '%hat'
   * ```
   */
  notLike = "notLike",
  /**
   * Operator NOT REGEXP (MySQL/PG only)
   *
   * ```js
   * [Op.notRegexp]: '^[h|a|t]'
   * ```
   * In SQL
   * ```sql
   * NOT REGEXP/!~ '^[h|a|t]'
   * ```
   */
  notRegexp = "notRegexp",
  /**
   * Operator OR
   *
   * ```js
   * [Op.or]: [{a: 5}, {a: 6}]
   * ```
   * In SQL
   * ```sql
   * (a = 5 OR a = 6)
   * ```
   */
  or = "or",
  /**
   * Operator && (PG array overlap operator)
   *
   * ```js
   * [Op.overlap]: [1, 2]
   * ```
   * In SQL
   * ```sql
   * && [1, 2)
   * ```
   */
  overlap = "overlap",
  /**
   * Internal placeholder
   *
   * ```js
   * [Op.placeholder]: true
   * ```
   */
  placeholder = "placeholder",
  /**
   * Operator REGEXP (MySQL/PG only)
   *
   * ```js
   * [Op.regexp]: '^[h|a|t]'
   * ```
   * In SQL
   * ```sql
   * REGEXP/~ '^[h|a|t]'
   * ```
   */
  regexp = "regexp",
  /**
   * Operator LIKE
   *
   * ```js
   * [Op.startsWith]: 'hat'
   * ```
   * In SQL
   * ```sql
   * LIKE 'hat%'
   * ```
   */
  startsWith = "startsWith",
  /**
   * Operator << (PG range strictly left of operator)
   *
   * ```js
   * [Op.strictLeft]: [1, 2]
   * ```
   * In SQL
   * ```sql
   * << [1, 2)
   * ```
   */
  strictLeft = "strictLeft",
  /**
   * Operator >> (PG range strictly right of operator)
   *
   * ```js
   * [Op.strictRight]: [1, 2]
   * ```
   * In SQL
   * ```sql
   * >> [1, 2)
   * ```
   */
  strictRight = "strictRight",
  /**
   * Operator LIKE
   *
   * ```js
   * [Op.substring]: 'hat'
   * ```
   * In SQL
   * ```sql
   * LIKE '%hat%'
   * ```
   */
  substring = "substring",
  /**
   * Operator VALUES
   *
   * ```js
   * [Op.values]: [4, 5, 6]
   * ```
   * In SQL
   * ```sql
   * VALUES (4), (5), (6)
   * ```
   */
  values = "values",
}
export { OpType as Op };
export { DBTable, AccountsColumn };
