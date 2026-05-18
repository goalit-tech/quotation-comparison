class Utils {

    createReadHandler(externalService, serviceEntities, entityName, navParentFKey) {
        return async (req) => {
            const entity = serviceEntities[entityName];
            const query = SELECT.from(entity);

            const sel = req.query.SELECT;
            if (sel.columns) query.SELECT.columns = sel.columns;
            if (sel.limit) query.SELECT.limit = sel.limit;
            if (sel.orderBy) query.SELECT.orderBy = sel.orderBy;
            if (sel.count) query.SELECT.count = sel.count;

            const from = sel.from;

            // Find the index of our entity anywhere in the ref chain
            const navIndex = from?.ref?.findIndex(segment => segment === entityName || segment?.id === entityName);
            const isNavigation = navIndex > 0; // index > 0 means it's a child in a navigation path

            if (isNavigation && navParentFKey) {
                // The parent segment sits just before our entity in the ref chain
                const parentSegment = from.ref[navIndex - 1];
                const parentId = parentSegment?.where?.find(e => e.val)?.val;
                if (parentId) {
                    query.where({ [navParentFKey]: parentId });
                }
            } else if (sel.where) {
                query.SELECT.where = sel.where;
            }

            return externalService.run(query);
        };
    }

}

export default Utils;